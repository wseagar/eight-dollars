const bearerToken = Object.values(
  webpackChunk_twitter_responsive_web.find((e) => e[0][0] === "main")[1]
)
  .find((e) => e.toString().match(/ACTION_FLUSH/))
  .toString()
  .match(/l="([A-Za-z0-9\%]+)"/)[1];

const csrfToken = Object.fromEntries(
  document.cookie.split(";").map((e) => e.split("="))
)[" ct0"];

async function fetchSearchResults(user) {
  const result = await fetch(
    `https://twitter.com/i/api/1.1/search/typeahead.json?include_ext_is_blue_verified=1&q=${encodeURIComponent(
      user
    )}&src=search_box&result_type=events%2Cusers%2Ctopics`,
    {
      headers: {
        authorization: `Bearer ${bearerToken}`,
        accept: "application/json",
        "x-csrf-token": csrfToken,
      },
      method: "GET",
    }
  );
  if (result.status !== 200) {
    console.log(await result.text());
    return;
  }
  const json = await result.json();
  return json;
}

function onSubmitSearch(search, user) {
  const baseUrl = "https://twitter.com/search?q=";
  let url = baseUrl + encodeURIComponent(search);
  if (user) {
    url += encodeURIComponent(` (from:${user})`);
  }
  url += "&src=typed_query";
  document.location.href = url;
}

// function hookInput(node) {
//   searchInput = node;

//   node.addEventListener("keydown", function (e) {
//     if (e.target.value === "" && e.key === "Backspace") {
//       removeElements(".eightDollarsSearchTags");
//     }

//     const { user, query } = getSearchTokens(e.target.value);

//     // console.log("keydown", e.nativeEvent.which);
//     if (user && !query) {
//       fetchSearchResults(user);
//     }

//     if (user && query) {
//       createTag(user, query);
//     }

//     console.log(e.key);
//     if (e.key === "Enter") {
//       e.preventDefault();
//       e.stopPropagation();
//       if (
//         document.querySelector("#tagSelectDestination").dataset
//           .eightDollarsFocusedScreenName
//       ) {
//         selectFromTag(
//           document.querySelector("#tagSelectDestination").dataset
//             .eightDollarsFocusedScreenName
//         );
//       } else {
//         onSubmitSearch(e.target.value);
//       }
//       return false;
//     }

//     if (e.nativeEvent.which == 38) {
//       // down
//       e.preventDefault();
//       e.stopPropagation();
//       tagSelectDestinationSetPreviousFocus();
//       return false;
//     } else if (e.nativeEvent.which == 40) {
//       // up
//       e.preventDefault();
//       e.stopPropagation();

//       tagSelectDestinationSetNextFocus();
//       return false;
//     }
//   });
// }

function getSearchTokens(searchValue) {
  const regex = /from:\s?@?(?<user>\w*)/;
  const match = searchValue.match(regex);

  if (match === null || match.groups === null || !match.groups.user) {
    return { query: searchValue, user: undefined };
  }
  const query = searchValue.replace(regex, "");

  return { user: match.groups.user, query };
}

const SEARCH_USER_BUTTON = "searchUser";
const SEARCH_RESULT_SELECTOR = ".searchResult";
const SEARCH_RESULT_CONTAINER = "#tagSelectDestination";

class Hook {
  constructor() {
    this.input = undefined;
    this.dropdown = undefined;
  }

  hookInput(element) {
    this.input = element;
    if (this.dropdown) {
      this.init();
    }
  }

  hookDropdown(element) {
    this.dropdown = element;
    if (this.input) {
      this.init();
    }
  }

  init() {
    // setup event listeners on input
    this.input.addEventListener("keydown", this.keydownListener.bind(this));

    // create new settings menu in the dropdown
    const container = document.createElement("div");
    container.innerHTML = DROPDOWN_HTML;
    this.dropdown.prepend(container);

    // setup event listeners in the DROPDOWN_HTML
    const searchUserButton = document.querySelector(`#${SEARCH_USER_BUTTON}`);
    // Sets "from: " into the input field
    searchUserButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.setInput("from: ");
    });
  }

  async keydownListener(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      this.tagSelectDestinationSetNextFocus()
      return false
    }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      this.tagSelectDestinationSetPreviousFocus()
      return false
    }

    const { user, query } = getSearchTokens(e.target.value);

    // If there is a user and no query, fetch search results
    // IE "from: @willsea"
    if (user && !query) {
      const searchResults = await fetchSearchResults(user);
      this.renderSearchResults(searchResults);
    }

    // If theres a user and a query, parse out the user to create a tag (this should occur on the first char after the user)
    // IE "from: @willsea hello world"
    if (user && query) {
      this.createTag(user, query);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      onSubmitSearch(e.target.value);
    }
  }

  renderSearchResults(searchResults) {
    // 1. Make sure to clear previous search results
    removeElements(SEARCH_RESULT_SELECTOR);
    // 2. Get search results container
    const elm = document.querySelector(SEARCH_RESULT_CONTAINER);
    console.log(elm);

    // 3. Add new search results
    searchResults.users.forEach((user) => {
      const userRow = document.createElement("div");
      userRow.classList.add('searchResult');

      if (elm.dataset.eightDollarsFocusedScreenName === user.screen_name) {
        userRow.classList.add("eightDollarsFocused");
      }

      userRow.dataset.eightDollarsScreenName = user.screen_name;
      userRow.innerHTML = `<img src="${user.profile_image_url}"/><div class="searchResultUser"><p><strong>${user.name}</strong></p><p>@${user.screen_name}</p></div>`;
      userRow.addEventListener("click", () => {
        this.createTag(user.screen_name, " ", true);
      });
      elm.appendChild(userRow);
    });
  }



  tagSelectDestinationSetNextFocus() {
    const elm = document.querySelector(SEARCH_RESULT_CONTAINER);

    // find the element that currently has focus
    const focused = elm.querySelector(".eightDollarsFocused");

    // remove focus from the element that currently has focus
    if (focused) {
      focused.classList.remove("eightDollarsFocused");
    }

    // find the next element
    let next = focused ? focused.nextElementSibling : elm.firstElementChild;

    // set focused class on the next element
    if (next) {
      next.classList.add("eightDollarsFocused");
      elm.dataset.eightDollarsFocusedScreenName =
        next.dataset.eightDollarsScreenName;
    }
  }

  tagSelectDestinationSetPreviousFocus() {
    const elm = document.querySelector(SEARCH_RESULT_CONTAINER);

    // find the element that currently has focus
    const focused = elm.querySelector(".eightDollarsFocused");

    // remove focus from the element that currently has focus
    if (focused) {
      focused.classList.remove("eightDollarsFocused");
    }

    // find the previous element
    let previous = focused
      ? focused.previousElementSibling
      : elm.lastElementChild;

    // set focused class on the previous element
    if (previous) {
      previous.classList.add("eightDollarsFocused");
      elm.dataset.eightDollarsFocusedScreenName =
        previous.dataset.eightDollarsScreenName;
    }
  }

  createTag(user, query) {
    const elm = document.querySelector(SEARCH_RESULT_CONTAINER);
    const d = document.createElement("div");
    d.classList.add("eightDollarsSearchTags");
    d.dataset.user = user;
    d.innerHTML = `<div class="searchTag"><strong>User:</strong> ${user}</div>`;
    elm.appendChild(d);
    this.setInput(query);
    removeElements(SEARCH_RESULT_SELECTOR);
  }

  setInput(value) {
    setReactInput(this.input, value, true);
  }
}

class Observer {
  constructor() {
    this._hooks = [];
    this._observer = null;
  }

  addHook(selector, callback) {
    this._hooks.push({ selector, callback });
  }

  observerCallback(mutations) {
    for (const mutation of mutations) {
      // attribute modifications
      if (mutation.type === "attributes") {
        for (const hook of this._hooks) {
          const element = document.querySelector(hook.selector);
          if (element) {
            if (!element.dataset.processed) {
              element.dataset.processed = true;
              hook.callback(element);
            }
          }
        }
      }

      // dom additions
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) {
          for (const hook of this._hooks) {
            const element = document.querySelector(hook.selector);
            if (element) {
              if (!element.dataset.processed) {
                hook.callback(element);
                element.dataset.processed = true;
              }
            }
          }
        }
      }
    }
  }

  observe() {
    this._observer = new MutationObserver(this.observerCallback.bind(this));
    this._observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }
}

const hook = new Hook();

const observer = new Observer();
observer.addHook("#typeaheadDropdown-1", hook.hookDropdown.bind(hook));
observer.addHook("#typeaheadDropdown-2", hook.hookDropdown.bind(hook));
observer.addHook("#typeaheadDropdown-3", hook.hookDropdown.bind(hook));
observer.addHook(
  "input[placeholder='Search Twitter']",
  hook.hookInput.bind(hook)
);
observer.observe();

// utils

function setReactInput(elm, value, focus = false) {
  const valueSetter = Object.getOwnPropertyDescriptor(elm, "value").set;
  const prototype = Object.getPrototypeOf(elm);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    "value"
  ).set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(elm, value);
  } else {
    valueSetter.call(elm, value);
  }

  elm.dispatchEvent(new Event("input", { bubbles: true }));
  if (focus) {
    elm.focus();
  }
}

function removeElements(selector) {
  const tags = document.querySelectorAll(selector);
  for (const t of tags) {
    // delete the tag node
    t.parentNode.removeChild(t);
  }
}

const DROPDOWN_HTML = `
<div class="searchContainer">
  <div id="tagSelectDestination"></div>
  <h4 class="searchContainerMemeHeading">Search Options</h4>
  <a id="searchUser" class="searchItem"><strong>from:</strong> user</a>
  <a id="searchMentions" class="searchItem"><strong>mentions:</strong> user</a>
  <a id="searchLinks" class="searchItem"><strong>has:</strong> link, embed, or file</a>
  <a id="searchBefore" class="searchItem"><strong>before:</strong> specific date</a>
  <a id="searchDuring" class="searchItem"><strong>during:</strong> specific date</a>
  <a id="searchAfter" class="searchItem"><strong>after:</strong> specific date</a>
  <style>
    .searchContainer {
      padding-bottom: 1rem;
    }
    .searchContainerMemeHeading {
      color: white;
      font-size: 20px;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;
      margin: 1rem;
    }
    .searchItem {
      color: white;
      font-size: 14px;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;
      width: 100%;
      display: block;
      background: none;
      border: none;
      padding: 0.5rem 1rem;
      transition: all 0.1s linear;
      box-sizing: border-box;
    }
    .searchItem p {
      font-family: inherit;
    }
    .searchItem:hover {
      color: #1d9bf0;
      cursor: pointer;
    }
    .searchTag {
      font-size: 0.9rem;
      color: #b4b4b4;
      background-color: #202327;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto;
      font-weight: 400;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
    }
    .eightDollarsSearchTags {
      display: flex;
      gap: 0.5rem;
      margin: 1rem;
    }

    .searchFrom:before {
      content: "From: ";
      display: flex;
      flex-direction: row;
      color: #1d9bf0;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto;
      font-weight: 700;
      padding: 0.2rem;
      border-radius: 4px;
    }
    .searchMentions:before {
      content: "Mentions: ";
      display: flex;
      flex-direction: row;
      color: #1d9bf0;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto;
      font-weight: 700;
      padding: 0.2rem;
      border-radius: 4px;
    }
    .searchHas:before {
      content: "Has: ";
      display: flex;
      flex-direction: row;
      color: #1d9bf0;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto;
      font-weight: 700;
      padding: 0.2rem;
      border-radius: 4px;
    }
    .searchBefore:before {
      content: "Before: ";
      display: flex;
      flex-direction: row;
      color: #1d9bf0;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto;
      font-weight: 700;
      padding: 0.2rem;
      border-radius: 4px;
    }
    .searchDuring:before {
      content: "During: ";
      display: flex;
      flex-direction: row;
      color: #1d9bf0;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto;
      font-weight: 700;
      padding: 0.2rem;
      border-radius: 4px;
    }
    .searchAfter:before {
      content: "After: ";
      display: flex;
      flex-direction: row;
      color: #1d9bf0;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto;
      font-weight: 700;
      padding: 0.2rem;
      border-radius: 4px;
    }
    .searchResult {
      display: flex;
      flex-direction: row;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
      padding: 0.5rem 1rem;
    }
    .searchResult.eightDollarsFocused {
      background-color: rgb(255 255 255 / 10%);
    }
    @media (prefers-color-scheme: light) {
      .searchResult.eightDollarsFocused {
        background-color: rgb(0 0 0 / 10%);
      }
    }


    .searchResult img {
      border-radius: 1200px;
      width: 3rem;
      height: 3rem;
    }
    .searchResult p {
      margin: 0;
      font-size: 0.9rem;
    }

    .searchResultUser {
      color: white;
      font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto;
      justify-content: center;
      gap: 0.2rem;
      display: flex;
      flex-direction: column;
    }
    .searchResultUser:hover {
      color: #1d9bf0;
      cursor: pointer;
    }

    @media (prefers-color-scheme: light) {
      html .searchContainerMemeHeading {
        color: black;
      }
      html .searchItem {
        color: black;
      }
      .searchResultUser {
        color: black;
      }
    }
  </style>
</div>
`;

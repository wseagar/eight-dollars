let searchInput;

const bearerToken = Object.values(
  webpackChunk_twitter_responsive_web.find((e) => e[0][0] === "main")[1]
)
  .find((e) => e.toString().match(/ACTION_FLUSH/))
  .toString()
  .match(/l="([A-Za-z0-9\%]+)"/)[1];

const csrfToken = Object.fromEntries(
  document.cookie.split(";").map((e) => e.split("="))
)[" ct0"];

function modifyDropdown(node) {
  if (node.dataset.processed || !searchInput) {
    // already processed
    return;
  }

  const advancedSearch = `
  <div class='searchContainer'>
  <div id='tagSelectDestination'></div>
  <h4 class="searchContainerMemeHeading">Search Options</h4>   
  <a id='searchUser' class='searchItem'><strong>from:</strong> user</a>
  <a id='searchMentions' class='searchItem'><strong>mentions:</strong> user</a>
  <a id='searchLinks' class='searchItem'><strong>has:</strong> link, embed, or file</a>
  <a id='searchBefore' class='searchItem'><strong>before:</strong> specific date</a>
  <a id='searchDuring' class='searchItem'><strong>during:</strong> specific date</a>
  <a id='searchAfter' class='searchItem'><strong>after:</strong> specific date</a>
  <style>
  .searchContainer {
    padding-bottom: 1rem;
  }
  .searchContainerMemeHeading {
    color: white;
    font-size: 20px;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    margin: 1rem;
  }
  .searchItem {
    color: white;
    font-size: 14px;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
  .searchItem:hover{
    color: #1D9BF0;
    cursor: pointer;
  }
  .searchTag {
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
  .searchFrom:before {
    content: "From: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
    .searchMentions:before {
    content: "Mentions: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
    .searchHas:before {
    content: "Has: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
      .searchBefore:before {
    content: "Before: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
        .searchDuring:before {
    content: "During: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
        .searchAfter:before {
    content: "After: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
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
  background-color: red;
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
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
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
  let container = document.createElement("div");
  container.innerHTML = advancedSearch;
  node.prepend(container);
  document.getElementById("searchUser").addEventListener("click", function (e) {
    e.preventDefault();
    const elm = document.querySelector("input[placeholder='Search Twitter']");
    triggerSetStateReactInput(elm, "from:", true);
  });
  node.dataset.processed = true;
}

function triggerSetStateReactInput(elm, value, focus = false) {
  setNativeValue(elm, value);
  elm.dispatchEvent(new Event("input", { bubbles: true }));
  if (focus) {
    elm.focus();
  }
}

function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    "value"
  ).set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
}

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

  const names = json.users.map((user) => user.screen_name);
  removeElements(".searchResult");

  const elm = document.querySelector("#tagSelectDestination");

  // add users to elm again
  json.users.forEach((user) => {
    const userRow = document.createElement("div");
    userRow.classList.add("searchResult");
    if (elm.dataset.eightDollarsFocusedScreenName === user.screen_name) {
      userRow.classList.add("eightDollarsFocused");
    }
    // userRow.href = `/${user.screen_name}`;
    userRow.dataset.eightDollarsScreenName = user.screen_name;
    userRow.innerHTML = `
        
            <img src="${user.profile_image_url}"/><div class="searchResultUser"><p><strong>${user.name}</strong></p><p>@${user.screen_name}</p></div>

        
    `;
    userRow.addEventListener("click", function (e) {
      // e.preventDefault();
      // //removeElements(".searchResult");
      createTag(user.screen_name, " ", true);
      // TODO: release control of keyboard
    });
    elm.appendChild(userRow);
  });
}

function getSearchTokens(search) {
  const regex = /from:\s?@?(?<user>\w*)/;
  const match = search.match(regex);

  if (match === null || match.groups === null || !match.groups.user) {
    return { query: search, user: undefined };
  }
  const query = search.replace(regex, "");

  return { user: match.groups.user, query };
}

function onSubmitSearch(search) {
  const user = document.querySelector(".eightDollarsSearchTags")?.dataset?.user;
  const baseUrl = "https://twitter.com/search?q=";
  let url = baseUrl + encodeURIComponent(search);
  if (user) {
    url += encodeURIComponent(` (from:${user})`);
  }
  url += "&src=typed_query";
  document.location.href = url;
}

function tagSelectDestinationSetNextFocus() {
  const elm = document.querySelector("#tagSelectDestination");

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

function tagSelectDestinationSetPreviousFocus() {
  const elm = document.querySelector("#tagSelectDestination");

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

function createTag(user, query) {
  const elm = document.querySelector("#tagSelectDestination");
  const d = document.createElement("div");
  d.classList.add("eightDollarsSearchTags");
  d.dataset.user = user;
  d.innerHTML = `<div class="searchTag">User: ${user}</div>`;
  elm.appendChild(d);
  triggerSetStateReactInput(searchInput, query, true);
  removeElements(".searchResult");
}

function removeElements(selector) {
  const tags = document.querySelectorAll(selector);
  for (const t of tags) {
    // delete the tag node
    t.parentNode.removeChild(t);
  }
}

function hookInput(node) {
  if (node.dataset.processed) {
    // already processed
    return;
  }
  searchInput = node;

  node.addEventListener("keydown", function (e) {
    if (e.target.value === "" && e.key === "Backspace") {
      removeElements(".eightDollarsSearchTags");
    }

    const { user, query } = getSearchTokens(e.target.value);

    // console.log("keydown", e.nativeEvent.which);
    if (user && !query) {
      fetchSearchResults(user);
    }

    if (user && query) {
      createTag(user, query);
    }

    console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmitSearch(e.target.value);
    }

    if (e.nativeEvent.which == 38) {
      // down
      e.preventDefault();
      e.stopPropagation();
      tagSelectDestinationSetPreviousFocus();
      return false;
    } else if (e.nativeEvent.which == 40) {
      // up
      e.preventDefault();
      e.stopPropagation();

      tagSelectDestinationSetNextFocus();
      return false;
    }
  });

  node.dataset.processed = true;
}

async function main() {
  const observer = new MutationObserver(function (mutations, observer) {
    try {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          const dropdown = mutation.target.querySelector(
            "#typeaheadDropdown-1"
          );
          const dropdown2 = mutation.target.querySelector(
            "#typeaheadDropdown-2"
          );
          const dropdown3 = mutation.target.querySelector(
            "#typeaheadDropdown-3"
          );
          if (dropdown) {
            modifyDropdown(dropdown);
          } else if (dropdown2) {
            modifyDropdown(dropdown2);
          } else if (dropdown3) {
            modifyDropdown(dropdown3);
          }
        }
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            const input = node.querySelector(
              "input[placeholder='Search Twitter']"
            );
            if (input) {
              hookInput(input);
            }

            const dropdown = mutation.target.querySelector(
              "#typeaheadDropdown-1"
            );
            const dropdown2 = mutation.target.querySelector(
              "#typeaheadDropdown-2"
            );
            const dropdown3 = mutation.target.querySelector(
              "#typeaheadDropdown-3"
            );
            if (dropdown) {
              modifyDropdown(dropdown);
            } else if (dropdown2) {
              modifyDropdown(dropdown2);
            } else if (dropdown3) {
              modifyDropdown(dropdown3);
            }
          }
        }
      }
    } catch (error) {
      console.log("uncaught mutation error", error);
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

main();

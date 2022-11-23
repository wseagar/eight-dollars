let searchInput;

const bearerToken = Object.values(
  webpackChunk_twitter_responsive_web.find((e) => e[0][0] === "main")[1]
)
  .find((e) => e.toString().match(/ACTION_FLUSH/))
  .toString()
  .match(/l="([A-Za-z0-9\%]+)"/)[1];
console.log("[TWITTER API] bearerToken", bearerToken);

const csrfToken = Object.fromEntries(
  document.cookie.split(";").map((e) => e.split("="))
)[" ct0"];

console.log("[TWITTER API] CSRF TOKEN", csrfToken);

function modifyDropdown(node) {
  if (node.dataset.processed || !searchInput) {
    // already processed
    return;
  }

  const advancedSearch = `
  <div class='searchContainer'>
  <h4 class="searchContainerMemeHeading">Search Options</h4>   
  <button id='searchUser' class='searchItem'><strong>from:</strong> user</button>
  <button id='searchMentions' class='searchItem'><strong>mentions:</strong> user</button>
  <button id='searchLinks' class='searchItem'><strong>has:</strong> link, embed, or file</button>
  <button id='searchBefore' class='searchItem'><strong>before:</strong> specific date</button>
  <button id='searchDuring' class='searchItem'><strong>during:</strong> specific date</button>
  <button id='searchAfter' class='searchItem'><strong>after:</strong> specific date</button>
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
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
    width: 100%;
    display: block;
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    transition: all 0.1s linear;
  }
  .searchItem:hover{
    color: #1D9BF0;
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
    setNativeValue(elm, "from:");
    elm.dispatchEvent(new Event("input", { bubbles: true }));
    elm.focus();
  });
  node.dataset.processed = true;
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

async function fetchSearchResults(value) {
  const query = value.replace("from:", "");
  console.log(query);
  const [user, ...rest] = query.split(" ");
  if (!user) {
    return;
  }

  console.log(user);

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

  console.log(json);

  const names = json.users.map((user) => user.screen_name);
  console.log(names);
  const elm = document.querySelector(".searchContainer");
  elm.prepend(
    ...json.users.map((user) => {
      const e = document.createElement("div");
      e.innerHTML = `
         
              <a class="searchResult" href="/${user.screen_name}"><img src="${user.profile_image_url}"/><div class="searchResultUser"><p><strong>${user.name}</strong></p><p>@${user.screen_name}</p></div></a>

          
      `;
      return e;
    })
  );
}

function hookInput(node) {
  if (node.dataset.processed) {
    // already processed
    return;
  }
  searchInput = node;

  node.addEventListener("keydown", function (e) {
    console.log("keydown", e.target.value);
    if (e.target.value.includes("from:")) {
      fetchSearchResults(e.target.value);
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
          if (dropdown) {
            modifyDropdown(dropdown);
          }
          else if (dropdown2) {
            modifyDropdown(dropdown2);
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
            if (dropdown) {
              modifyDropdown(dropdown);
            }
            else if (dropdown2) {
              modifyDropdown(dropdown2);
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

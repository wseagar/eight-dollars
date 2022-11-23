let searchInput;

const bearerToken = webpackChunk_twitter_responsive_web[2][1][63752].toString().match(/l="([A-Za-z0-9\%]+)"/)[1]
console.log('[TWITTER API] bearerToken', bearerToken)

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
  .searchFrom {
    content: "From: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
    .searchMentions {
    content: "Mentions: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
    .searchHas {
    content: "Has: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
      .searchBefore {
    content: "Before: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
        .searchDuring {
    content: "During: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
        .searchAfter {
    content: "After: ";
    display: flex;
    flex-direction: row;
    color: #1d9bf0;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    font-weight: 700;
    padding: 0.2rem;
    border-radius: 4px;
  }
@media (prefers-color-scheme: light) {
  html .searchContainerMemeHeading { 
    color: black;
  }
    html .searchItem { 
    color: black;
  }
}
  </style>
  </div>
  `;
  let container = document.createElement("div");
  container.innerHTML = advancedSearch;
  node.prepend(container);
  node.dataset.processed = true;
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
    `https://twitter.com/i/api/1.1/search/typeahead.json?include_ext_is_blue_verified=1&q=${user}&src=search_box&result_type=events%2Cusers%2Ctopics`,
    {
      headers: {
        authorization: "todo",
        accept: "application/json",
        "x-csrf-token": "todo",
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
  const elm = document.querySelector(".searchContainer");
  elm.prepend(
    names.map((name) => document.createElement("div").innerHTML(name))
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
          if (dropdown) {
            modifyDropdown(dropdown);
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
            if (dropdown) {
              modifyDropdown(dropdown);
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

function modifyDropdown(node) {
  if (node.dataset.processed) {
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

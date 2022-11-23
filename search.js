function modifyDropdown(node) {
  const advancedSearch = `
  <div class='searchContainer'>
  <h4 class="searchContainerMemeHeading">Search Options</h4>   
  <button class='searchItem'><strong>from:</strong> user</button>
  <button class='searchItem'><strong>mentions:</strong> user</button>
  <button class='searchItem'><strong>has:</strong> link, embed, or file</button>
  <button class='searchItem'><strong>before:</strong> specific date</button>
  <button class='searchItem'><strong>during:</strong> specific date</button>
  <button class='searchItem'><strong>after:</strong> specific date</button>
  </div>
  `;
  node.innerHTML = `${advancedSearch}`;
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

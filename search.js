function modifyDropdown(node) {

}

async function main() {
    const observer = new MutationObserver(function (mutations, observer) {
        try {
          for (const mutation of mutations) {
            if (mutation.type === "attributes") {
                const dropdown = mutation.target.querySelector("#typeaheadDropdown-1")
                if (dropdown) {
                    modifyDropdown(dropdown);
                }
               
            }
          }
        }
        catch (error) {
          console.log('uncaught mutation error', error)
        }
      });
    
      observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true
      });
}

main();
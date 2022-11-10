
function getElementAsync(selector) {
  return new Promise((resolve) => {
    let timeoutId;
    let observer;

    function finish(foundElement) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (observer) {
        observer.disconnect();
      }

      if (foundElement == null) {
        console.log("Timed out: didn't find element with selector", selector);
        resolve(null);
      }      
      resolve(foundElement);
    }

    observer = new MutationObserver(function (mutations, observer) {
      const elm = document.querySelector(selector);
      if (elm) {
        finish(elm);
      }
    });

    timeoutId = setTimeout(finish, 5000, null);
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });
}

async function main() {
  const verificationIcon = await getElementAsync(
    "span.css-901oao.css-16my406.r-xoduu5.r-18u37iz.r-1q142lx.r-poiln3.r-adyw6z.r-135wba7.r-bcqeeo.r-qvutc0"
  );
  if (!verificationIcon) {
    console.log("NO VERIFICATION ICON");
    return;
  }

  const names = Object.getOwnPropertyNames(verificationIcon);
  const reactPropsName = names.find((name) => name.startsWith("__reactProps"));
  if (!reactPropsName) {
    console.log("Couldn't find react props");
    return;
  }
  console.log(reactPropsName);
  const props = verificationIcon[reactPropsName];
  console.log(props);

  const isBlueVerified =
    props.children.props.children[0][0].props.isBlueVerified;
  const isVerified = props.children.props.children[0][0].props.isVerified;

  console.log("isBlueVerified", isBlueVerified);
  console.log("isVerified", isVerified);
  console.log(props);

  if (isVerified) {
    const nodes = document.querySelectorAll(
      'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2."]'
    );
    for (const node of nodes) {
      node.style = "color: black;";
    }
  }

  if (isBlueVerified) {
    const nodes = document.querySelectorAll(
      'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2."]'
    );
    for (const node of nodes) {
      node.style = "color: pink;";
    }
  }
}

main();

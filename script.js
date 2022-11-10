const BLUE_CHECK_PATTERN = 'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2."]';

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

function getElementsAsync(selector) {
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
      const elm = document.querySelectorAll(selector);
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

async function mutateHeader() {}

async function mutateTweets() {
  const tweets = await getElementsAsync(
    "div.css-901oao.r-18jsvk2.r-xoduu5.r-18u37iz.r-1q142lx.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0"
  );
  if (!tweets) {
    console.log("No tweets with verification found");
    return;
  }

  for (const tweet of tweets) {
    const names = Object.getOwnPropertyNames(tweet);
    const reactPropsName = names.find((name) =>
      name.startsWith("__reactProps")
    );
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

    const svg = tweet.querySelector(BLUE_CHECK_PATTERN);
    if (isVerified) {
      changeVerified(svg);
    }

    if (isBlueVerified) {
      changeBlueVerified(svg);
    }
  }
}

function changeVerified(elm) {

}

function changeBlueVerified(elm) {

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
      node.style = "color: #7b5804;";
    }
  }

  if (isBlueVerified) {
    const nodes = document.querySelectorAll(
      'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2."]'
    );
    console.log("NUMBER OF NODES: ", nodes.length);
    for (const node of nodes) {
      node.parentElement.parentElement.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.25 12C22.25 10.57 21.37 9.33 20.06 8.66C20.52 7.27 20.26 5.76 19.25 4.75C18.24 3.74 16.73 3.48 15.34 3.94C14.68 2.63 13.43 1.75 12 1.75C10.57 1.75 9.33 2.63 8.67 3.94C7.27 3.48 5.76 3.74 4.75 4.75C3.74 5.76 3.49 7.27 3.95 8.66C2.64 9.33 1.75 10.57 1.75 12C1.75 13.43 2.64 14.67 3.95 15.34C3.49 16.73 3.74 18.24 4.75 19.25C5.76 20.26 7.27 20.51 8.66 20.06C9.33 21.37 10.57 22.25 12 22.25C13.43 22.25 14.68 21.37 15.34 20.06C16.73 20.51 18.24 20.26 19.25 19.25C20.26 18.24 20.52 16.73 20.06 15.34C21.37 14.67 22.25 13.43 22.25 12Z" fill="#1D9BF0"/>
      <path d="M11.4395 9.24414C10.7988 9.48633 10.4785 9.78711 10.4785 10.1465C10.4785 10.4551 10.7988 10.6504 11.4395 10.7324V9.24414ZM12.6992 14.5059C13.5547 14.209 13.9824 13.8398 13.9824 13.3984C13.9824 12.7344 13.5547 12.3574 12.6992 12.2676V14.5059ZM15.7168 13.4746C15.7168 14.2129 15.4023 14.8242 14.7734 15.3086C14.2578 15.707 13.5664 15.9961 12.6992 16.1758V17.6406C12.6992 18.0586 12.4746 18.2676 12.0254 18.2676C11.8301 18.2676 11.6777 18.1934 11.5684 18.0449C11.4824 17.9238 11.4395 17.7891 11.4395 17.6406V16.3457C11.2871 16.3535 11.1387 16.3574 10.9941 16.3574C10.209 16.3574 9.59766 16.252 9.16016 16.041C8.76562 15.8535 8.56836 15.6133 8.56836 15.3203C8.56836 14.7617 8.87695 14.4824 9.49414 14.4824C9.6543 14.4824 9.92578 14.541 10.3086 14.6582C10.6914 14.7715 10.9395 14.8281 11.0527 14.8281C11.1582 14.8281 11.2871 14.8184 11.4395 14.7988V12.2148C10.7559 12.1719 10.1738 12.0273 9.69336 11.7812C9.06445 11.4609 8.75 11.0176 8.75 10.4512C8.75 9.80664 9.03125 9.21289 9.59375 8.66992C10.0938 8.18555 10.709 7.82812 11.4395 7.59766V6.63086C11.4395 6.17383 11.6543 5.94531 12.084 5.94531C12.4941 5.94531 12.6992 6.17383 12.6992 6.63086V7.4043C13.1406 7.43164 13.6133 7.5293 14.1172 7.69727C14.7617 7.9082 15.084 8.15039 15.084 8.42383C15.084 8.64648 15.0039 8.83594 14.8438 8.99219C14.6836 9.14844 14.4922 9.22656 14.2695 9.22656C14.082 9.22656 13.8203 9.18945 13.4844 9.11523C13.1289 9.04102 12.8672 9 12.6992 8.99219V10.791C12.7539 10.791 12.7969 10.793 12.8281 10.7969C13.6914 10.8633 14.373 11.1055 14.873 11.5234C15.4355 11.9922 15.7168 12.6426 15.7168 13.4746Z" fill="white"/>
      </svg>`;
    }
  }
}

main();

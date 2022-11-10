const BLUE_CHECK_PATTERN =
  'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2."]';

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
      const elms = document.querySelectorAll(selector);
      if (elms.length !== 0) {
        finish(elms);
      }
    });

    timeoutId = setTimeout(finish, 5000, null);
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });
}

async function mutateHeader() {
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

  console.log("[HEADER] isBlueVerified", isBlueVerified);
  console.log("[HEADER] isVerified", isVerified);
  console.log(props);

  if (isVerified) {
    const nodes = document.querySelectorAll(
      'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2."]'
    );
    for (const node of nodes) {
      changeVerified(node);
    }
  }

  if (isBlueVerified) {
    const nodes = document.querySelectorAll(
      'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2."]'
    );
    console.log("NUMBER OF NODES: ", nodes.length);
    for (const node of nodes) {
      changeBlueVerified(node);
    }
  }
}

async function mutateTweets() {
  console.log("[TWEETS] MUTATING TWEETS");
  const tweets = await getElementsAsync(
    "div.css-901oao.r-18jsvk2.r-xoduu5.r-18u37iz.r-1q142lx.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0"
  );
  console.log("[TWEETS] GOT TWEETS", tweets);
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
    const props = tweet[reactPropsName];
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
  elm.parentElement.parentElement.parentElement.innerHTML = `<div style='display: flex; flex-direction: row; align-items: center; border-radius: 120px; border: 1px solid #536471; padding: 0.1rem 0.4rem 0.1rem 0.2rem; gap: 0.2rem;'><svg viewBox="0 0 24 24" aria-label="Verified account" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" style="fill: "#1D9BF0";"></path></g></svg><p style=' font-size: 0.8rem; margin: 0; font-weight: 600;'>Actually Verified</p></div>`;
}

function changeBlueVerified(elm) {
  elm.parentElement.parentElement.parentElement.innerHTML = `<div style='display: flex; flex-direction: row; align-items: center; border-radius: 120px; border: 1px solid #536471; padding: 0.1rem 0.4rem 0.1rem 0.2rem; gap: 0.2rem;'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.25 12C22.25 10.57 21.37 9.33 20.06 8.66C20.52 7.27 20.26 5.76 19.25 4.75C18.24 3.74 16.73 3.48 15.34 3.94C14.68 2.63 13.43 1.75 12 1.75C10.57 1.75 9.33 2.63 8.67 3.94C7.27 3.48 5.76 3.74 4.75 4.75C3.74 5.76 3.49 7.27 3.95 8.66C2.64 9.33 1.75 10.57 1.75 12C1.75 13.43 2.64 14.67 3.95 15.34C3.49 16.73 3.74 18.24 4.75 19.25C5.76 20.26 7.27 20.51 8.66 20.06C9.33 21.37 10.57 22.25 12 22.25C13.43 22.25 14.68 21.37 15.34 20.06C16.73 20.51 18.24 20.26 19.25 19.25C20.26 18.24 20.52 16.73 20.06 15.34C21.37 14.67 22.25 13.43 22.25 12Z" fill="#1D9BF0"/>
<path d="M11.3339 10.3033V7.58999C10.1557 7.96788 9.56661 8.55235 9.56661 9.34341C9.56661 9.83215 10.1557 10.1521 11.3339 10.3033ZM12.9147 11.898V15.8281C13.5423 15.6467 14.0663 15.3796 14.4867 15.0269C14.9544 14.6238 15.1883 14.188 15.1883 13.7194C15.1883 12.8427 14.4304 12.2356 12.9147 11.898ZM12.9147 4.64242V5.9197H12.9503C13.5186 5.9197 14.167 6.00283 14.8952 6.16911C15.8484 6.38577 16.325 6.66289 16.325 7.00047C16.325 7.44387 16.0616 7.66556 15.5346 7.66556C15.2978 7.66556 14.8804 7.61266 14.2824 7.50685C13.6903 7.396 13.2345 7.3431 12.9147 7.34813V10.4242C14.2232 10.525 15.2475 10.8903 15.9876 11.5201C16.6625 12.1046 17 12.81 17 13.6363C17 14.649 16.5885 15.488 15.7655 16.153C15.0373 16.7375 14.087 17.123 12.9147 17.3094V19.3198C12.9147 19.5163 12.8378 19.6775 12.6838 19.8035C12.5358 19.9345 12.3464 20 12.1155 20C11.5944 20 11.3339 19.7783 11.3339 19.3349V17.4077C8.44464 17.3724 7 16.735 7 15.4955C7 15.042 7.24571 14.8153 7.73712 14.8153C8.01539 14.8153 8.28182 14.9085 8.53641 15.0949C8.91533 15.3721 9.20249 15.5535 9.39787 15.6391C9.87152 15.8407 10.5169 15.9565 11.3339 15.9868V11.7015H11.2629C10.3452 11.6712 9.55181 11.4798 8.88277 11.1271C8.05388 10.6937 7.63943 10.0916 7.63943 9.32074C7.63943 8.63045 8.01835 7.98048 8.7762 7.37081C9.47484 6.80649 10.3274 6.39584 11.3339 6.13888V4.68777C11.3339 4.49126 11.4109 4.32751 11.5648 4.1965C11.7247 4.0655 11.9201 4 12.151 4C12.6602 4 12.9147 4.21414 12.9147 4.64242Z" fill="white"/>
</svg><p style=' font-size: 0.8rem; margin: 0; font-weight: 600;'>Paid for Verification</p></div>`;
}

async function main() {
  mutateHeader();
  setInterval(() => {
    mutateTweets();
  }, 3000);

  addEventListener("scroll", (event) => {
    mutateTweets();
  });
}

main();

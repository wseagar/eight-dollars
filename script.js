const BLUE_CHECK_PATTERN =
  'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"]';

function changeVerified(elm, isSmall) {
  
  const small = `<svg viewBox="0 0 24 24" aria-label="Verified account" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.76z" style="fill: "#1D9BF0";"></path></g></svg>`
  const big =  `<div style='margin-left: 0.25rem; display: flex; flex-direction: row; align-items: center;'><svg viewBox="0 0 24 24" aria-label="Verified account" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.76z" style="fill: "#1D9BF0";"></path></g></svg></div>`;
  try {
    if (isSmall) {
      elm.parentElement.innerHTML = small;
    } else {
      elm.parentElement.parentElement.parentElement.innerHTML = big;
    }
  } catch (e) {
    console.log(elm);
    throw e;
  }
}

function changeBlueVerified(elm, isSmall) {
  const small = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path style="stroke: #AAAABC; stroke-width: 2px; stroke-linejoin: round; fill=none;" d="M22.25 12C22.25 10.57 21.37 9.33 20.06 8.66C20.52 7.27 20.26 5.76 19.25 4.75C18.24 3.74 16.73 3.48 15.34 3.94C14.68 2.63 13.43 1.75 12 1.75C10.57 1.75 9.33 2.63 8.67 3.94C7.27 3.48 5.76 3.74 4.75 4.75C3.74 5.76 3.49 7.27 3.95 8.66C2.64 9.33 1.75 10.57 1.75 12C1.75 13.43 2.64 14.67 3.95 15.34C3.49 16.73 3.74 18.24 4.75 19.25C5.76 20.26 7.27 20.51 8.66 20.06C9.33 21.37 10.57 22.25 12 22.25C13.43 22.25 14.68 21.37 15.34 20.06C16.73 20.51 18.24 20.26 19.25 19.25C20.26 18.24 20.52 16.73 20.06 15.34C21.37 14.67 22.25 13.43 22.25 12Z" />
  <path d="M 15.4893 13.9579 c 0 -1.9858 -2.1218 -2.5502 -3.0391 -2.8123 c -1.7338 -0.4838 -1.8799 -1.1088 -1.8547 -1.4263 c 0.0605 -0.7812 0.9173 -0.9727 1.7136 -0.8014 c 0.625 0.1361 1.2701 0.504 1.6279 0.7862 L 15.071 8.3736 c -0.5594 -0.383 -1.2751 -0.877 -2.3234 -1.0786 V 6.0048 h -1.6582 v 1.2449 C 9.4816 7.3706 8.4131 8.3786 8.4131 9.7646 c 0 1.3507 0.9778 1.9858 1.9555 2.4595 c 0.8165 0.3881 3.0946 0.7963 2.9635 1.8245 c -0.0706 0.5594 -0.6653 0.9727 -1.6481 0.8467 c -0.8568 -0.1058 -1.7741 -0.8266 -1.7741 -0.8266 l -1.255 1.2449 c 0.756 0.6098 1.5574 0.9929 2.4293 1.1693 v 1.2146 h 1.6582 v -1.1542 C 14.325 16.3721 15.4893 15.2935 15.4893 13.9579 z" fill="#AAAABC"/>
  </svg>`;
  const big = `<div style='margin-left: 0.25rem; display: flex; flex-direction: row; align-items: center;'><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path style="stroke: #AAAABC; stroke-width: 2px; stroke-linejoin: round; fill=none;" d="M22.25 12C22.25 10.57 21.37 9.33 20.06 8.66C20.52 7.27 20.26 5.76 19.25 4.75C18.24 3.74 16.73 3.48 15.34 3.94C14.68 2.63 13.43 1.75 12 1.75C10.57 1.75 9.33 2.63 8.67 3.94C7.27 3.48 5.76 3.74 4.75 4.75C3.74 5.76 3.49 7.27 3.95 8.66C2.64 9.33 1.75 10.57 1.75 12C1.75 13.43 2.64 14.67 3.95 15.34C3.49 16.73 3.74 18.24 4.75 19.25C5.76 20.26 7.27 20.51 8.66 20.06C9.33 21.37 10.57 22.25 12 22.25C13.43 22.25 14.68 21.37 15.34 20.06C16.73 20.51 18.24 20.26 19.25 19.25C20.26 18.24 20.52 16.73 20.06 15.34C21.37 14.67 22.25 13.43 22.25 12Z" />
  <path d="M 15.4893 13.9579 c 0 -1.9858 -2.1218 -2.5502 -3.0391 -2.8123 c -1.7338 -0.4838 -1.8799 -1.1088 -1.8547 -1.4263 c 0.0605 -0.7812 0.9173 -0.9727 1.7136 -0.8014 c 0.625 0.1361 1.2701 0.504 1.6279 0.7862 L 15.071 8.3736 c -0.5594 -0.383 -1.2751 -0.877 -2.3234 -1.0786 V 6.0048 h -1.6582 v 1.2449 C 9.4816 7.3706 8.4131 8.3786 8.4131 9.7646 c 0 1.3507 0.9778 1.9858 1.9555 2.4595 c 0.8165 0.3881 3.0946 0.7963 2.9635 1.8245 c -0.0706 0.5594 -0.6653 0.9727 -1.6481 0.8467 c -0.8568 -0.1058 -1.7741 -0.8266 -1.7741 -0.8266 l -1.255 1.2449 c 0.756 0.6098 1.5574 0.9929 2.4293 1.1693 v 1.2146 h 1.6582 v -1.1542 C 14.325 16.3721 15.4893 15.2935 15.4893 13.9579 z" fill="#AAAABC"/>
  </svg></div>`
  try {
    if (isSmall) {
      elm.parentElement.innerHTML = small;
    } else {
      elm.parentElement.parentElement.parentElement.innerHTML = big;
    }
  } catch (e) {
    console.log(elm);
    throw e;
  }
}

const headerNode =
  "span.css-901oao.css-16my406.r-xoduu5.r-18u37iz.r-1q142lx.r-poiln3.r-bcqeeo.r-qvutc0";
const tweets =
  "div.css-901oao.r-xoduu5.r-18u37iz.r-1q142lx.r-37j5jr.r-16dba41.r-bcqeeo.r-qvutc0";
const profileNode =
  "span.css-901oao.css-16my406.r-xoduu5.r-18u37iz.r-1q142lx.r-poiln3.r-adyw6z.r-135wba7.r-bcqeeo.r-qvutc0";

const search = `form > * > * > * > * > * > * > * > * > * > * > * > * > ${tweets}`;
const chat = `#layers > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > * > ${tweets}`;
const youMightLike = `div > aside > div:nth-child(2) > * > * >* > * > * > * > * > a > div > ${tweets}`;

async function main() {
  const observer = new MutationObserver(function (mutations, observer) {
    for (const mutation of mutations) {
      // run query selector on each added node
      const selectors = [search, chat, youMightLike, headerNode, tweets, profileNode];
      for (const selector of selectors) {
        const isSmall = selectors.indexOf(selector) < 3;
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            const elms = node.querySelectorAll(selector);
            for (const elm of elms) {
              const svg = node.querySelector(BLUE_CHECK_PATTERN);
              if (svg) {
                const names = Object.getOwnPropertyNames(elm);
                const reactPropsName = names.find((name) =>
                  name.startsWith("__reactProps")
                );
                if (!reactPropsName) {
                  console.log("Couldn't find react props", node);
                  continue;
                }
                const props = elm[reactPropsName];
                const isBlueVerified =
                  props.children.props.children[0][0].props.isBlueVerified;
                const isVerified =
                  props.children.props.children[0][0].props.isVerified;

                if (isVerified) {
                  changeVerified(svg, isSmall);
                } else if (isBlueVerified) {
                  changeBlueVerified(svg, isSmall);
                }
              }
            }
          }
        }
      }
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

main();

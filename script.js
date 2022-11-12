const config = document.getElementById("eight-dollars-settings");
const data = JSON.parse(config.innerText);

const MEME_MODE = data.memeMode;
const TEXT_ENABLED = data.textEnabled;
const REMOVE_TWITTER_BLUE_VERIFICATION = data.removeBlueVerification;
const TEXT_VERIFIED_LABEL = data.textOptions?.verifiedLabel || "";
const TEXT_TWITTER_BLUE_LABEL = data.textOptions?.twitterBlueLabel || "";
const TEXT_ENABLE_BORDER = data.textOptions?.enableBorder ?? true;


const BLUE_CHECK_PATTERN =
  'svg path[d^="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"]';

const COMIC_SANS_BLUE_DOLLAR_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.25 12C22.25 10.57 21.37 9.33 20.06 8.66C20.52 7.27 20.26 5.76 19.25 4.75C18.24 3.74 16.73 3.48 15.34 3.94C14.68 2.63 13.43 1.75 12 1.75C10.57 1.75 9.33 2.63 8.67 3.94C7.27 3.48 5.76 3.74 4.75 4.75C3.74 5.76 3.49 7.27 3.95 8.66C2.64 9.33 1.75 10.57 1.75 12C1.75 13.43 2.64 14.67 3.95 15.34C3.49 16.73 3.74 18.24 4.75 19.25C5.76 20.26 7.27 20.51 8.66 20.06C9.33 21.37 10.57 22.25 12 22.25C13.43 22.25 14.68 21.37 15.34 20.06C16.73 20.51 18.24 20.26 19.25 19.25C20.26 18.24 20.52 16.73 20.06 15.34C21.37 14.67 22.25 13.43 22.25 12Z" fill="#1D9BF0"/>
<path d="M11.3339 10.3033V7.58999C10.1557 7.96788 9.56661 8.55235 9.56661 9.34341C9.56661 9.83215 10.1557 10.1521 11.3339 10.3033ZM12.9147 11.898V15.8281C13.5423 15.6467 14.0663 15.3796 14.4867 15.0269C14.9544 14.6238 15.1883 14.188 15.1883 13.7194C15.1883 12.8427 14.4304 12.2356 12.9147 11.898ZM12.9147 4.64242V5.9197H12.9503C13.5186 5.9197 14.167 6.00283 14.8952 6.16911C15.8484 6.38577 16.325 6.66289 16.325 7.00047C16.325 7.44387 16.0616 7.66556 15.5346 7.66556C15.2978 7.66556 14.8804 7.61266 14.2824 7.50685C13.6903 7.396 13.2345 7.3431 12.9147 7.34813V10.4242C14.2232 10.525 15.2475 10.8903 15.9876 11.5201C16.6625 12.1046 17 12.81 17 13.6363C17 14.649 16.5885 15.488 15.7655 16.153C15.0373 16.7375 14.087 17.123 12.9147 17.3094V19.3198C12.9147 19.5163 12.8378 19.6775 12.6838 19.8035C12.5358 19.9345 12.3464 20 12.1155 20C11.5944 20 11.3339 19.7783 11.3339 19.3349V17.4077C8.44464 17.3724 7 16.735 7 15.4955C7 15.042 7.24571 14.8153 7.73712 14.8153C8.01539 14.8153 8.28182 14.9085 8.53641 15.0949C8.91533 15.3721 9.20249 15.5535 9.39787 15.6391C9.87152 15.8407 10.5169 15.9565 11.3339 15.9868V11.7015H11.2629C10.3452 11.6712 9.55181 11.4798 8.88277 11.1271C8.05388 10.6937 7.63943 10.0916 7.63943 9.32074C7.63943 8.63045 8.01835 7.98048 8.7762 7.37081C9.47484 6.80649 10.3274 6.39584 11.3339 6.13888V4.68777C11.3339 4.49126 11.4109 4.32751 11.5648 4.1965C11.7247 4.0655 11.9201 4 12.151 4C12.6602 4 12.9147 4.21414 12.9147 4.64242Z" fill="white"/>
</svg>`;

const REGULAR_BLUE_DOLLAR_SVG = `<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<path d="M22.25,12 C22.25,10.57 21.37,9.33 20.06,8.66 C20.52,7.27 20.26,5.76 19.25,4.75 C18.24,3.74 16.73,3.48 15.34,3.94 C14.68,2.63 13.43,1.75 12,1.75 C10.57,1.75 9.33,2.63 8.67,3.94 C7.27,3.48 5.76,3.74 4.75,4.75 C3.74,5.76 3.49,7.27 3.95,8.66 C2.64,9.33 1.75,10.57 1.75,12 C1.75,13.43 2.64,14.67 3.95,15.34 C3.49,16.73 3.74,18.24 4.75,19.25 C5.76,20.26 7.27,20.51 8.66,20.06 C9.33,21.37 10.57,22.25 12,22.25 C13.43,22.25 14.68,21.37 15.34,20.06 C16.73,20.51 18.24,20.26 19.25,19.25 C20.26,18.24 20.52,16.73 20.06,15.34 C21.37,14.67 22.25,13.43 22.25,12 Z" id="Path" fill="#1D9BF0" fill-rule="nonzero"></path>
<path d="M13.8953012,9.17414679 C13.7123981,8.90893727 13.4677652,8.7146027 13.1614025,8.5911431 C12.8550397,8.46768349 12.532673,8.40595369 12.1943022,8.40595369 C11.9931088,8.40595369 11.7987742,8.42881658 11.6112985,8.47454236 C11.4238228,8.52026814 11.2546374,8.59342938 11.1037424,8.6940261 C10.9528473,8.79462282 10.831674,8.92494129 10.7402224,9.08498152 C10.6487709,9.24502175 10.6030451,9.43478374 10.6030451,9.65426748 C10.6030451,9.9834931 10.7173595,10.2349849 10.9459884,10.4087429 C11.1746173,10.5825008 11.4581172,10.7333959 11.7964879,10.8614281 C12.1348587,10.9894603 12.5052375,11.1129199 12.9076244,11.2318069 C13.3100113,11.3506939 13.6803901,11.5153067 14.0187608,11.7256453 C14.3571316,11.9359839 14.6406315,12.2149112 14.8692604,12.5624271 C15.0978893,12.909943 15.2122037,13.3717734 15.2122037,13.9479182 C15.2122037,14.4691921 15.1161796,14.9241636 14.9241313,15.3128328 C14.732083,15.7015019 14.4737324,16.0238686 14.1490793,16.279933 C13.8244263,16.5359974 13.4471886,16.7280457 13.0173663,16.8560778 C12.5875439,16.98411 12.1348587,17.0481261 11.6593106,17.0481261 C11.0557303,17.0481261 10.4750129,16.9475294 9.91715837,16.746336 C9.35930385,16.5451425 8.87918316,16.2067718 8.4767963,15.7312237 L9.77998103,14.4691921 C9.99031962,14.7892726 10.2669606,15.0384781 10.6099039,15.2168086 C10.9528473,15.3951392 11.3163672,15.4843044 11.7004638,15.4843044 C11.9016572,15.4843044 12.1028507,15.456869 12.3040441,15.401998 C12.5052375,15.3471271 12.6881406,15.2648207 12.8527535,15.1550788 C13.0173663,15.045337 13.149971,14.9058733 13.2505677,14.7366879 C13.3511645,14.5675026 13.4014628,14.373168 13.4014628,14.1536842 C13.4014628,13.7970232 13.2871484,13.5226685 13.0585195,13.3306202 C12.8298906,13.1385719 12.5463907,12.9762454 12.20802,12.8436406 C11.8696492,12.7110359 11.4992704,12.58529 11.0968835,12.466403 C10.6944966,12.3475159 10.3241178,12.1851894 9.98574704,11.9794234 C9.64737627,11.7736574 9.36387643,11.4993027 9.13524753,11.1563594 C8.90661863,10.813416 8.79230418,10.3538719 8.79230418,9.77772709 C8.79230418,9.27474351 8.89518719,8.8403486 9.1009532,8.47454236 C9.30671921,8.10873612 9.57650131,7.80465968 9.9102995,7.56231304 C10.2440977,7.31996641 10.625908,7.13934958 11.0557303,7.02046255 C11.4855526,6.90157552 11.9245201,6.84213201 12.3726328,6.84213201 C12.8847615,6.84213201 13.3808862,6.91986583 13.8610069,7.07533349 C14.3411276,7.23080114 14.7732362,7.48686551 15.1573328,7.84352659 L13.8953012,9.17414679 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero"></path>
<polygon id="Path" fill="#FFFFFF" fill-rule="nonzero" points="12.4306693 5.98530124 12.4306693 18.0146988 11.375459 18.0146988 11.375459 5.98530124"></polygon>
</svg>`

const REGULAR_BLUE_CHECK_SVG = `<svg viewBox="0 0 24 24" aria-label="Verified account PROCESSED" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.76z" style="fill: "#1D9BF0";"></path></g></svg>`;

function changeVerified(elm, isSmall) {
  
  const small = REGULAR_BLUE_CHECK_SVG;
  const big =  `
    <div style='margin-left: 0.25rem; display: flex; flex-direction: row; align-items: center;${TEXT_ENABLE_BORDER ? ` border-radius: 120px; border: 1px solid #536471;`: ``} padding: 0.1rem 0.4rem 0.1rem 0.2rem; gap: 0.2rem;' aria-label="Verified account PROCESSED">
      <svg viewBox="0 0 24 24" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.76z" style="fill: "#1D9BF0";"></path></g></svg>
      <p style=' font-size: 0.8rem; margin: 0; font-weight: 600;'>${TEXT_VERIFIED_LABEL}</p>
    </div>`;
  try {
    if (isSmall || !TEXT_ENABLED) {
      elm.parentElement.innerHTML = small;
    } else {
      elm.parentElement.innerHTML = big;
    }
  } catch (e) {
    console.log(elm);
    throw e;
  }
}

function changeBlueVerified(elm, isSmall) {
  if (REMOVE_TWITTER_BLUE_VERIFICATION) {
    elm.parentElement.innerHTML = '';
    return;
  }

  const svg = MEME_MODE ? `${COMIC_SANS_BLUE_DOLLAR_SVG}` : `${REGULAR_BLUE_DOLLAR_SVG}`;
  const small = `${svg}`;
  const big = `
    <div style='margin-left: 0.25rem; display: flex; flex-direction: row; align-items: center;${TEXT_ENABLE_BORDER ? ` border-radius: 120px; border: 1px solid #536471;`: ``} padding: 0.1rem 0.4rem 0.1rem 0.2rem; gap: 0.2rem;'>
      ${svg}
      <p style=' font-size: 0.8rem; margin: 0; font-weight: 600;'>${TEXT_TWITTER_BLUE_LABEL}</p>
    </div>`
  try {
    if (isSmall || !TEXT_ENABLED) {
      elm.parentElement.innerHTML = small;
    } else {
      elm.parentElement.innerHTML = big;
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
const spaces = `div.css-1dbjc4n.r-1awozwy.r-ar5de.r-1777fci.r-117bsoe.r-4ukpa0.r-1pn2ns4 ${headerNode}`;


const BLUE_CHECK_PATTERN_NEW = '[aria-label="Verified account"]'
const BLUE_CHECK_PATTERN_PROVIDE_DETAILS = '[aria-label="Provides details about verified accounts."]'

function querySelectorAllIncludingMe(node, selector) {
  if (node.matches(selector)) {
    return [node]
  }
  return [...node.querySelectorAll(selector)]
}

// From https://stackoverflow.com/a/74240138/2230249
function getReactProps(parent, target) {
  const keyof_ReactProps = Object.keys(parent).find(k => k.startsWith("__reactProps$"));
  const symof_ReactFragment = Symbol.for("react.fragment");

  //Find the path from target to parent
  let path = [];
  let elem = target;
  while (elem !== parent) {
      let index = 0;
      for (let sibling = elem; sibling != null;) {
          if (sibling[keyof_ReactProps]) index++;
          sibling = sibling.previousElementSibling;
      }
      path.push({ child: elem, index });
      elem = elem.parentElement;
  }
  //Walk down the path to find the react state props
  let state = elem[keyof_ReactProps];
  for (let i = path.length - 1; i >= 0 && state != null; i--) {
      //Find the target child state index
      let childStateIndex = 0, childElemIndex = 0;
      while (childStateIndex < state.children.length) {
          let childState = state.children[childStateIndex];
          if (childState instanceof Object) {
              //Fragment children are inlined in the parent DOM element
              let isFragment = childState.type === symof_ReactFragment && childState.props.children.length;
              childElemIndex += isFragment ? childState.props.children.length : 1;
              if (childElemIndex === path[i].index) break;
          }
          childStateIndex++;
      }
      let childState = state.children[childStateIndex] ?? (childStateIndex === 0 ? state.children : null);
      state = childState?.props;
      elem = path[i].child;
  }
  return state;
}

function performBluecheckFindAndReplace(node) {
  const isSmall = false
  const blueChecks = querySelectorAllIncludingMe(node, BLUE_CHECK_PATTERN_NEW)
  for (const blueCheckComponent of blueChecks) {
    try {
      const nestedProps = getReactProps(blueCheckComponent.parentElement.parentElement.parentElement, blueCheckComponent)

      const isBlueVerified =
        nestedProps.isBlueVerified;
      const isVerified =
        nestedProps.isVerified;

      if (isBlueVerified) {
        changeBlueVerified(blueCheckComponent, isSmall);
      } else if (isVerified) {
        changeVerified(blueCheckComponent, isSmall);
      }
    }
    catch (e) {
      console.error("Error getting 'Verified account' react props: ", e)
    }
  }

  const blueChecksProvidesDetails = querySelectorAllIncludingMe(node, BLUE_CHECK_PATTERN_PROVIDE_DETAILS)
  for (const blueCheckEl of blueChecksProvidesDetails) {
    const blueCheckComponent = blueCheckEl.parentElement.parentElement.parentElement
    try {
      const nestedProps = getReactProps(blueCheckComponent.parentElement.parentElement, blueCheckComponent).children[1].props.children.props

      const isBlueVerified =
        nestedProps.isBlueVerified;
      const isVerified =
        nestedProps.isVerified;

      console.log({isBlueVerified, isVerified})

      if (isBlueVerified) {
        changeBlueVerified(blueCheckEl, isSmall);
      } else if (isVerified) {
        changeVerified(blueCheckEl, isSmall);
      }
    } catch (e) {
      console.error("Error getting 'Provides details' react props: ", e)
    }
  }
}

async function main() {
  const observer = new MutationObserver(function (mutations, observer) {
    try {
      for (const mutation of mutations) {
        console.log('mutation', mutation)
        if (mutation.type === 'attributes') {
          performBluecheckFindAndReplace(mutation.target)
        }
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            performBluecheckFindAndReplace(node)
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

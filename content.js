const defaultConfig = {
  advancedSearch: false,
  memeMode: false,
  textEnabled: true,
  removeBlueVerification: false,
  textOptions: {
    verifiedLabel: "Verified",
    twitterBlueLabel: "Paid",
    enableBorder: true,
  },
};

function createSettingsDomNode(items) {
  const settingsDomNode = document.createElement("div");
  settingsDomNode.id = "eight-dollars-settings";
  settingsDomNode.style.display = "none";
  settingsDomNode.innerText = JSON.stringify(items);
  document.body.appendChild(settingsDomNode);
}

function injectScript() {
  const s = document.createElement("script", { id: "eight-dollars" });
  s.src = chrome.runtime.getURL("script.js");
  s.onload = function () {
    this.remove();
  };
  document.head.appendChild(s);
}

function injectSearch() {
  const s = document.createElement("script", { id: "eight-dollars-search" });
  s.src = chrome.runtime.getURL("search.js");
  s.onload = function () {
    this.remove();
  };
  document.head.appendChild(s);
}

if (typeof chrome !== "undefined" && chrome.storage) {
  chrome.storage.local.get(defaultConfig, function (items) {
    createSettingsDomNode(items);
    injectScript();
    if (items.advancedSearch) {
      injectSearch();
    }
  });
} else {
  createSettingsDomNode(defaultConfig);
  injectScript();
  if (defaultConfig.advancedSearch) {
    injectSearch();
  }
}

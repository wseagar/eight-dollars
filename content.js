const defaultConfig = {
  memeMode: false,
  textEnabled: true,
  textOptions: {
    verifiedLabel: "Verified",
    twitterBlueLabel: "Paid",
    enableBorder: true
  },
  removeBlueMark: false
};

function createSettingsDomNode(items) {
    const settingsDomNode = document.createElement("div");
    settingsDomNode.id = "eight-dollars-settings";
    settingsDomNode.style.display = "none";
    settingsDomNode.innerText = JSON.stringify(items);
    document.body.appendChild(settingsDomNode);
}

if (typeof chrome !== "undefined") {
  chrome.storage.sync.get(defaultConfig, function (items) {
    createSettingsDomNode(items);
  });
} else {
    createSettingsDomNode(defaultConfig);
}

const s = document.createElement("script", { id: "eight-dollars" });
s.src = chrome.runtime.getURL("script.js");
s.onload = function () {
  this.remove();
};
document.head.appendChild(s);

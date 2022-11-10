const s = document.createElement('script', { id: 'customScripty' });
s.src = chrome.runtime.getURL('script.js');
s.onload = function() {
    this.remove();
};
console.log("APPENDING SCRIPT TO DOCUMENT");
document.head.appendChild(s);
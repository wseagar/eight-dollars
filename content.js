const s = document.createElement('script', { id: 'eight-dollars' });
s.src = chrome.runtime.getURL('script.js');
s.onload = function() {
    this.remove();
};
document.head.appendChild(s);
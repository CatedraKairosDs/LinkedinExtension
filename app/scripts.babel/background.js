'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

//console.log('\'Allo \'Allo! Event Page for Browser Action');

// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]linkedin.com[...]
//var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?linkedin\.com/;
var urlRegex = /^file:\/\/\/:?/;
/* A function creator for callbacks */
function doStuffWithDOM(element) {
  alert("I received the following DOM content:\n" + element);
}

/* When the browser-action button is clicked... */
chrome.browserAction.onClicked.addListener(function(tab) {
  /*...check the URL of the active tab against our pattern and... */
      /* ...if it matches, send a message specifying a callback too */
      chrome.tabs.sendMessage(tab.id, { text: "report_back" },
                              doStuffWithDOM);
  
});
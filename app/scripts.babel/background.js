'use strict';
//var url = "https://localhost:3000/saveData";

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

//chrome.browserAction.setBadgeText({text: 'TL'});

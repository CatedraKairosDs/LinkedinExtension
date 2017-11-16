'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

//console.log('\'Allo \'Allo! Event Page for Browser Action');

// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]linkedin.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?linkedin\.com/;


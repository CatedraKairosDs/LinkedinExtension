'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\E'});

//console.log('\'Allo \'Allo! Event Page for Browser Action');

// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]linkedin.com[...]
//var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?linkedin\.com/;
/* A function creator for callbacks */


//chrome.browserAction.onClicked.addListener(function () {
//  chrome.tabs.sendMessage(0, {text: 'report_back'}, doStuffWithDom);
//});


/*
//function doStuffWithDom(domContent) {
//  console.log('I received the following DOM content:\n' + domContent);
//}
*/
var respuesta;
function click(e) {
  console.log("Se pulsa!!")
  chrome.tabs.executeScript(null,
      {
          code: "document.body.style.backgroundColor='red'" //; console.log(document);"
      });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {senAll: "yes"}, function handler(response) {
      respuesta = response;
      console.log(response);
    });
  });
      
}



'use strict';
var req = new XMLHttpRequest();
var url = "http://localhost:3000/saveData";

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

var respuesta;
function click(e) {
  console.log("Se pulsa!!")
  chrome.tabs.executeScript(null,
      {
          code: "document.body.style.backgroundColor='red'" //; console.log(document);"
      });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {sendAll: "yes"}, function handler(response) {
        fetch(url, {
          method: 'POST',
          body: response
        });
      // req.open("POST", url, true);
      // req.send(JSON.stringify(response));
      console.log(response);
    });
  });
      
}

document.addEventListener('DOMContentLoaded', function () {
  var botons = document.querySelectorAll('.boton1');
  for (var i = 0; i < botons.length; i++) {
    botons[i].addEventListener('click', click);
  }
});


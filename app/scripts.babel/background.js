'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\E'});

function clicked() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "getinfo"}, function(response) {
      console.log(response.respuesta);
      muestraresultado(response.respuesta);
    });
  });
          
}

document.addEventListener('DOMContentLoaded', function () {
  var botons = document.querySelectorAll('.boton1');
  for (var i = 0; i < botons.length; i++) {
    botons[i].addEventListener('click', clicked);
  }
});

function muestraresultado(array){
  var resultado= document.getElementById("resultado");
  resultado.style="display: block";
  for(var i=0; i<array.length; i++){
    document.getElementById(i.toString()).innerHTML=array[i];
  }
}
'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

var selectorPuesto = document.getElementById("SelectorPuesto");
var acceptButton = document.getElementById("accept");
var maybeButton = document.getElementById("maybe");
var refuseButton = document.getElementById("refuse");

var puesto = selectorPuesto.options[selectorPuesto.selectedIndex].text;

selectorPuesto.addEventListener('change', function(event){
  console.log("Ha cambiado");
  puesto = selectorPuesto.options[selectorPuesto.selectedIndex].text;
  console.log("Dentro: " + puesto)
});

acceptButton.addEventListener('click', function(event){
  confirm("Estás aceptando un perfil de "+puesto);
  console.log("Acceptado para el puesto: "+puesto);
});

maybeButton.addEventListener('click', function(event){
  confirm('Estás "metiendo en la nevera" un perfil de '+puesto);
  console.log("Quizás para el puesto: "+puesto);
});

refuseButton.addEventListener('click', function(event){
  prompt("Estás rechazando un perfil para el puesto de "+puesto+"\n ¿Por qué?");
  console.log("Rechazado para el puesto: "+puesto);
});

console.log("Fuera: "+puesto);




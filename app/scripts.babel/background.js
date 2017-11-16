'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

//console.log('\'Allo \'Allo! Event Page for Browser Action');

var selectorPuesto = document.getElementById("SelectorPuesto");
var acceptButton = document.getElementById("accept");
var maybeButton = document.getElementById("maybe");
var refuseButton = document.getElementById("refuse");
var puesto = selectorPuesto.options[selectorPuesto.selectedIndex].text;
var confirmacion = document.getElementById("confirmacion");
var resultado = document.getElementById("resultado");
confirmacion.style.display = 'none';
resultado.style.display = 'none';
var acept=  document.getElementById("acept");
var cancel=  document.getElementById("cancel");

selectorPuesto.addEventListener('change', function(event){
  console.log("Ha cambiado");
  puesto = selectorPuesto.options[selectorPuesto.selectedIndex].text;
  console.log("Dentro: " + puesto)
  confirmacion.style.display = 'none';
  resultado.style.display = 'none';
});

acceptButton.addEventListener("click", function(event){
  var txt;
  var r = confirm("Estás aceptando un perfil de "+puesto);
  console.log(r);
  if (r == true) {
    txt = "Acceptado para el puesto: "+puesto;
  } else {
    txt = "Cancelado!";
  }
  console.log(txt);
  document.getElementById("confirmacion").innerHTML = txt;
});

maybeButton.addEventListener('click', function(event){
  confirmacion.style.display = '';
  //confirm('Estás "metiendo en la nevera" un perfil de '+puesto);
  console.log("Quizás para el puesto: "+puesto);
});

refuseButton.addEventListener('click', function(event){
  prompt("Estás rechazando un perfil para el puesto de "+puesto+"\n ¿Por qué?");
  console.log("Rechazado para el puesto: "+puesto);
});

acept.addEventListener('click', function(event){
  confirmacion.style.display = 'none';
  document.getElementById("resultado").innerHTML= "Acceptado para el puesto: "+puesto;
  resultado.style.display = '';
  
});
cancel.addEventListener('click', function(event){
  confirmacion.style.display = 'none';
  document.getElementById("resultado").innerHTML= "Cancelado"
  resultado.style.display = '';
  
});
console.log("Fuera: "+puesto);




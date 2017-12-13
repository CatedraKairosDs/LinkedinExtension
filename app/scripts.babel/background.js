'use strict';
var req = new XMLHttpRequest();
//var url = "https://localhost:3000/saveData";

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: 'TL'});

var respuesta;
function click(label, puesto, url) {
  console.log("Se pulsa!!")
  var comentario = "";
  if (String(label) === "aceptado") {
    comentario = document.querySelector('#RazonAceptado').value;
    document.getElementById("RazonAceptado").value = "";
  } else if (String(label) === "nevera") {
    comentario = document.querySelector('#RazonNevera').value;
    document.getElementById("RazonNevera").value = "";
  } else if (String(label) === "cancelado") {
    comentario = document.querySelector('#RazonRechazo').value;
    console.log(comentario);
    document.getElementById("RazonRechazo").value = "";
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {sendAll: "yes"}, function handler(response) {
      var data = new FormData();
      //console.log(response);
      response.label = String(label);
      response.puesto = String(puesto);
      response.comment = String(comentario);
      data.set("json", JSON.stringify(response));
      //console.log(data);
      //console.log(data.get('json'));
        fetch(url, {
          method: 'POST',
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify(response)
        }).then(function(r){
          console.log(r);
        }).catch(function(err){
          console.log(err);
        });
    });
  });     
}

document.querySelector('#AceptarAceptar').addEventListener('click', function() {
  var puesto = document.querySelector('#SelectorPuesto').options[document.getElementById('SelectorPuesto').selectedIndex].text;
  console.log("Se pulsa en aceptar");
  var urlAux = "";
  //Las url no son definitivas
  click("aceptado", puesto, "https://34.248.142.102/api-linkedin/v1/profiles");
});

document.querySelector('#AceptarQuizas').addEventListener('click', function() {
  var puesto = document.querySelector('#SelectorPuesto').options[document.getElementById('SelectorPuesto').selectedIndex].text;
  console.log("Se pulsa en la nevera");
  click("nevera", puesto, "https://34.248.142.102/api-linkedin/v1/profiles");
});

document.querySelector('#AceptarCancelar').addEventListener('click', function() {
  var puesto = document.querySelector('#SelectorPuesto').options[document.getElementById('SelectorPuesto').selectedIndex].text;
  console.log("Se pulsa en cancelar");
  click("cancelado", puesto, "https://34.248.142.102/api-linkedin/v1/profiles");
});



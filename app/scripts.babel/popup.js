'use strict';

console.log('\Bienvenido al clasificador de Linkedin');

var selectorPuesto = document.getElementById("SelectorPuesto");
//Botones generales
var acceptButton = document.getElementById("accept");
var maybeButton = document.getElementById("maybe");
var refuseButton = document.getElementById("refuse");
//Botones del formulario de aceptar
var acceptAceptarButton;
var cancelAceptarButton;
//Botones del formulario de quizas
var acceptQuizasButton;
var cancelQuizasButton;
//Botones del formulario de cancelar
var acceptCancelarButton;
var cancelCancelarButton;
//Formularios
var formAccept = document.getElementById("formAccept");
var formMaybe = document.getElementById("formMaybe");
var formCancel = document.getElementById("formCancel");
var razon;

//Puesto seleccionado en el selector
var puesto = selectorPuesto.options[selectorPuesto.selectedIndex].text;

//Listener de cambios en el selector y actualización del puesto
selectorPuesto.addEventListener('change', function(event){
  console.log("Ha cambiado");
  puesto = selectorPuesto.options[selectorPuesto.selectedIndex].text;
  console.log("Dentro: " + puesto);
  formAccept.style="display: none";
  formMaybe.style="display: none";
  formCancel.style="display: none";

});

//Listener del boton aceptar para sacar el formulario de aceptar
acceptButton.addEventListener('click', function(){
  formAccept.style="display: block";
  formMaybe.style="display: none";
  formCancel.style="display: none";
  var frase = document.getElementById("Frase aceptar");
  frase.innerHTML = "Estás aceptando un perfil de "+puesto.bold();
  acceptAceptarButton = document.getElementById("AceptarAceptar");
  cancelAceptarButton = document.getElementById("CancelarAceptar");

  //Listeners del formulario de acepar
  acceptAceptarButton.addEventListener('click', function() {
    formAccept.style="display: none";
    console.log("Popup: Manda Mensaje");
  });

  cancelAceptarButton.addEventListener('click', function() {
    formAccept.style="display: none";
  });
});

//Listener del boton de quizas para sacar el formulario de quizas
maybeButton.addEventListener('click', function(event){
  formMaybe.style="display: block";
  formAccept.style="display: none";
  formCancel.style="display: none";
  var frase = document.getElementById("Frase quizas");
  frase.innerHTML = 'Estás "metiendo en la nevera" un perfil de '+puesto.bold();
  acceptQuizasButton = document.getElementById("AceptarQuizas");
  cancelQuizasButton = document.getElementById("CancelarQuizas");
  //Listeners del formulario de quizas
  acceptQuizasButton.addEventListener('click', function() {
    formMaybe.style="display: none";
  });

  cancelQuizasButton.addEventListener('click', function() {
    formMaybe.style="display: none";
  });
});

//Listener del boton de cancelar para sacar el formulario de cancelar
refuseButton.addEventListener('click', function(event){
  formCancel.style="display: block";
  formAccept.style="display: none";
  formMaybe.style="display: none";
  var frase = document.getElementById("Frase cancelar");
  frase.innerHTML = "Estás rechazando un perfil de "+puesto.bold();
  acceptCancelarButton = document.getElementById("AceptarCancelar");
  cancelCancelarButton = document.getElementById("CancelarCancelar");
  //Listeners del formulario de cancelar
  acceptCancelarButton.addEventListener('click', function() {
    razon = document.getElementById("RazonRechazo").value;
    document.getElementById("RazonRechazo").value = "";
    formCancel.style="display: none";
  });

  cancelCancelarButton.addEventListener('click', function() {
    document.getElementById("RazonRechazo").value = "";
    formCancel.style="display: none";
  });

});




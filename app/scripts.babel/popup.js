'use strict';
(()=>{
  console.log('Bienvenido al clasificador de Linkedin');

  var selectorPuesto = document.getElementById('SelectorPuesto');
  var sentence = document.getElementById('sentence');
  var msgs = document.getElementById('msgs');
  var reason = document.getElementById('reason');

  //Botones generales
  var radioButtons = $('#election input[name=options]');
  var accpetButton = document.getElementById('accept');
  var cancelButton = document.getElementById('cancel');
  //Formularios
  var step1 = document.getElementById('step1');
  var step2 = document.getElementById('step2');

  var locale = {
    accept: 'Aceptar',
    maybe: 'Quizá',
    refuse: 'Rechazar'
  };


  function resetForm() {
    sentence.innerHTML = 'Perfil';
    var election = $('#election input[name=options]:checked');
    election.prop('checked',false);
    election.parent().removeClass('active');
    step1.removeAttribute('hidden');
    step2.setAttribute('hidden', '');
    reason.value = '';
  }

  function showMessage(msg, type) {
    msgs.innerHTML = msg;
    msgs.removeAttribute('hidden');
    msgs.classList.add('alert-' + type);
    var timeout = setTimeout(() => {
      clearTimeout(timeout);
      msgs.setAttribute('hidden', '');
    }, 5000)
  }

  //Listener del boton aceptar para sacar el formulario de aceptar
  radioButtons.change(function(){
    step1.setAttribute('hidden', '');
    step2.removeAttribute('hidden');
    //Puesto seleccionado en el selector
    var puesto = selectorPuesto.value;
    var election = $('#election input[name=options]:checked').val();
    sentence.innerHTML = `${locale[election]} ${puesto.bold()}`;

    //Listeners del formulario de acepar
    accpetButton.addEventListener('click', function() {
      step1.setAttribute('hidden', '');
    });

    cancelButton.addEventListener('click', resetForm);
  });

  function sendData(label, puesto, url) {
    console.log('Se pulsa!!')
    var comentario = document.querySelector('#reason').value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {sendAll: 'yes'}, function handler(response) {
        if (response) {
          var data = new FormData();
          //console.log(response);
          response.label = String(label);
          response.puesto = String(puesto);
          response.comment = String(comentario);
          data.set('json', JSON.stringify(response));
          //console.log(data);
          //console.log(data.get('json'));
          fetch(url, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(response)
          }).then(function(r){
            showMessage('Perfil guardado correctamente', 'success');
          }).catch(function(err){
            showMessage('Ha ocurrido un error, vuelve a intentarlo.', 'danger');
          });
          resetForm();
        } else {
          showMessage('No se ha podido obtener datos. ¿Estás en Linkedin Recruiter?', 'info');
        }
      });
    });     
  }
  
  $('#accept').click(()  => {
    var puesto = selectorPuesto.value;
    var election = $('#election input[name=options]:checked').val();
    console.log('Se pulsa en ' + election);
    //Las url no son definitivas
    sendData(election, puesto, 'https://34.248.142.102/api-linkedin/v1/profiles');
  });
  
})();
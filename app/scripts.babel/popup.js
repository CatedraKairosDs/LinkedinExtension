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
  var firstRadioButtons = $('#firstElection input[name=firstOptions]');
  //Formularios
  var step1 = document.getElementById('step1');
  var step2 = document.getElementById('step2');
  var optionStep = document.getElementById('optionStep');

  //

  var locale = {
    accept: 'Aceptar',
    maybe: 'Quizá',
    refuse: 'Rechazar'
  };


  function resetForm() {
    sentence.innerHTML = 'Perfil';
    var election = $('#election input[name=options]:checked');
    var firstElection = $('#firstElection input[name=firstOptions]:checked');
    election.prop('checked',false);
    election.parent().removeClass('active');
    firstElection.prop('checked', false);
    firstElection.parent().removeClass('active');
    step1.setAttribute('hidden', '');
    step2.setAttribute('hidden', '');
    document.getElementById('optionStepMessage').setAttribute('hidden', '');
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
  firstRadioButtons.change(function(){
    var firstElection = $('#firstElection input[name=firstOptions]:checked').val();
    if (firstElection === "info") {
      step1.setAttribute('hidden', '');
      getIds()
      //Mostrar info en la página ¿y un OK para volver?
    } else if (firstElection === "save") {
      document.getElementById('optionStepMessage').setAttribute('hidden', '');
      step1.removeAttribute('hidden');
      //Mostrar step1 y demás
    }
    console.log(firstElection);
  })
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

  function getIds(){
    var respuesta = {};
    var perfiles = "";
    var data = [];
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {sendAll: 'ids'}, function getterHandler(response){
        if (response) {
          //console.log(response);
          var url = "";
          for (var i = 0; i<response.length; i++) {
            url = "https://34.248.142.102/api-linkedin/v1/profiles/idLinkedin/"+response[i];
            searchProfile(url, respuesta, response, i);
          }
        }
      })
    })
  }

  function searchProfile(url, respuesta, response, i) {
    fetch(url, {
      method: 'GET'
    }).then(function(r){
      r.json().then(function(rjson) {
        var key = String(response[i]);
        respuesta[key] = rjson;
        return respuesta;
        }).then(function(res){
          if (response.length === Object.keys(res).length) {
            presentData(res);
          }
      })
    }).catch(function(err) {
      console.log(err);
    })
  }

  function presentData(profiles) {
    console.log('Presentar datos');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log("Perfiles: ", profiles);
      var profileAux = {
        "12345" : {
          "profile": [{"1": "uno"}, {"2": "dos"}]
        }
      };
      console.log("Se mandan los datos ahora");
      chrome.tabs.sendMessage(tabs[0].id, {sendAll: 'requestedInfo', info: profiles}, function handler(response) {
        if (response) {
          document.getElementById('optionStepMessage').removeAttribute('hidden');
        }
      })
    })
    console.log(profiles);
  }

  function sendData(label, puesto, url) {
    console.log('Se pulsa!!')
    var comentario = document.querySelector('#reason').value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {sendAll: 'yes'}, function handler(response) {
        var linkedinId = tabs[0].url.split('/')[5].split(',')[0];
        //console.log(linkedinId);
        if (response) {
          var data = new FormData();
          //console.log(response);
          response.linkedinId = linkedinId;
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
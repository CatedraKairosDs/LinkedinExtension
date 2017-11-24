chrome.runtime.onMessage.addListener(
    
    function(request, sender, sendResponse) {
        if (request.method == "getinfo")
            sendResponse({respuesta: getData()});
});
  
  function getData() {
      var name = document.getElementsByClassName("pv-top-card-section__name Sans-26px-black-85%")[0].innerHTML;
      var localizacion= document.getElementsByClassName("pv-top-card-section__location Sans-17px-black-70% mb1 inline-block")[0].innerHTML;
      var actual_role= document.getElementsByClassName("Sans-17px-black-85%-semibold")[2].innerHTML;
      var previous_role= document.getElementsByClassName("Sans-17px-black-85%-semibold")[3].innerHTML;
      var datos= [];
      datos.push(name, localizacion, actual_role, previous_role)
      return datos;
  }
  
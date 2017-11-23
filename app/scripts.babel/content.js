/*chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // If the received message has the expected format...
    if (request.all === 'yes') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.body);
        console.log("Content: Envía mensaje");
    }
});



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(document.getElementById("voyager-feed"));
        sendResponse(document.getElementById("voyager-feed").innerHTML);
    });
 
*/



chrome.runtime.onMessage.addListener(
    
    function(request, sender, sendResponse) {
        if (request.method == "getinfo")
            sendResponse({respuesta: getData()});
});
  
  function getData() {
      var name = document.getElementsByClassName("pv-top-card-section__name Sans-26px-black-85%")[0].innerHTML;
      var localizacion= document.getElementsByClassName("pv-top-card-section__location Sans-17px-black-70% mb1 inline-block")[0].innerHTML;
      var datos= [];
      datos.push(name, localizacion)
      return datos;
  }
  
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
document.addEventListener('DOMContentLoaded', function () {
    var botons = document.querySelectorAll('.boton1');
    for (var i = 0; i < botons.length; i++) {
      botons[i].addEventListener('click', click);
    }
  });
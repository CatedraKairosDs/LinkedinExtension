//no hagas mucho caso, he hecho varias pruebas pero no consigo 
//que funcione, lo que es curioso es que ahora el confirm
//se mantiene jaja

/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing 
           the web-pages DOM content as argument */
    sendResponse(document.getElementById("mybutton").innerHTML);
    }
});
confirm("Hello from your Chrome extension!");
var firstHref = $("a[href^='http']").eq(0).attr("href");

console.log(firstHref);
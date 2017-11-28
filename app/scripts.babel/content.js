/*chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // If the received message has the expected format...
    if (request.all === 'yes') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.body);
        console.log("Content: Envía mensaje");
    }
});
*/
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var name = document.getElementsByClassName("pv-top-card-section__name Sans-26px-black-85%")[0].innerHTML;
        var actualJob = document.getElementsByClassName("pv-top-card-section__headline Sans-19px-black-85%")[0].innerHTML;
        var actualCompany = document.getElementsByClassName("pv-top-card-section__company Sans-17px-black-70% mb1 inline-block")[0].innerHTML;
        var location = document.getElementsByClassName("pv-top-card-section__location Sans-17px-black-70% mb1 inline-block")[0].innerHTML;
        var connections = document.getElementsByClassName("pv-top-card-section__connections pv-top-card-section__connections--with-separator Sans-17px-black-70% mb1 inline-block")[0].childNodes[1].innerHTML;
        //var nInterests = document.getElementsByClassName("pv-profile-section__section-info section-info display-flex justify-flex-start overflow-hidden")[0].childNodes.length;
        //var interests = []
        //for (var i = 0; i < int(nInterests); i++) {
        //    interests[i] = 0;
        //} //pv-profile-section__see-more-inline link pv-profile-section__see-more-inline link 
        var experienceAll = document.getElementsByClassName("pv-profile-section__card-item pv-position-entity ember-view");
        //console.log(experienceAll);
        var experience = [];
        for (var i = 0; i < experienceAll.length; i++) {
            //console.log(experienceAll[i].childNodes[2].childNodes);
            var childAux = experienceAll[i].childNodes[2].childNodes[3];
            var puestoDescription = childAux.childNodes[1].innerHTML;
            //console.log(puestoDescription);
            var cmpny = childAux.childNodes[3].childNodes[3].innerHTML;
            //console.log(cmpny);
            var cuando = childAux.childNodes[6].childNodes[3].innerHTML;
            //console.log(cuando);
            var cuanto = childAux.childNodes[9].childNodes[3].innerHTML;
            //console.log(cuanto);
            var puesto = [puestoDescription, cmpny, cuando, cuanto];
            experience[i] = puesto;
        }
        var skillsAll = document.getElementsByClassName("pv-skill-entity__pill-contents static-pill");
        //console.log(skillsAll[0]);
        var skills = [];
        for (var j = 0; j < skillsAll.length; j++) {
            var skill = skillsAll[j].childNodes[1].innerHTML;
            console.log(skill);
            var nVerif = skillsAll[j].childNodes[7].innerHTML;
            skills[j] = [skill, nVerif];
        }
        var profile = [name, actualJob, actualCompany, location, connections, experience, skills];
        sendResponse(profile); //profile-content
    });
  
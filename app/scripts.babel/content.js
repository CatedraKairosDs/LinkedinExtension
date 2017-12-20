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
        let a = document.createElement('a');
        a.href = '';
        if (a.href.indexOf('linkedin.com') == -1) {
            sendResponse(null);
            return;
        }
        //General
        var name = document.getElementsByClassName('profile-info')[0].childNodes[0].innerText;
        var extract = '';
        if (document.getElementById('profile-summary')) {
            extract = document.getElementById('profile-summary').childNodes[1].innerText;
        }
        console.log('Nombre: ', name);
        //Experiencia
        var jsonExperience = [];
        if (document.getElementById('profile-experience')) {
            var experienceAll = document.getElementById('profile-experience').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < experienceAll.length; i++) {
                var childAux = experienceAll[i].childNodes[0];
                var puestoName = childAux.childNodes[0].childNodes[0].innerText;
                var cmpny = childAux.childNodes[1].childNodes[0].innerText;
                var cuando = childAux.childNodes[2].childNodes[0].nodeValue;
                var description = '';
                var cuanto = '';
                var donde = '';
                if ((experienceAll[i].childNodes[1]) && (experienceAll[i].childNodes.length > 2)){
                    if (experienceAll[i].childNodes[1].target != '_blank') {
                        description = experienceAll[i].childNodes[1].innerText;
                    } else {
                        description = experienceAll[i].childNodes[2].innerText;
                    }
                } else {
                    description = '';
                }
                if (childAux.childNodes[2].childNodes[2]) {
                    donde = childAux.childNodes[2].childNodes[2].innerText;
                    if (childAux.childNodes[2].childNodes[1]){
                        cuanto = childAux.childNodes[2].childNodes[1].innerText;
                    } else {
                        cuanto = '';
                    }
                } else {
                    donde = '';
                    if (childAux.childNodes[2].childNodes[1]){
                        cuanto = childAux.childNodes[2].childNodes[1].innerText;
                    } else {
                        cuanto = '';
                    }
                }
                var jsonPuesto = {
                    jobName: puestoName,
                    jobDescription: description,
                    company: cmpny,
                    when: cuando,
                    howMuch: cuanto,
                    where: donde
                };
                jsonExperience.push(jsonPuesto);
            }
        } else {
            jsonExperience = '';
        }

        //Idiomas
        var jsonLanguages = [];
        if (document.getElementById('profile-language')) {
            var idiomaAll = document.getElementById('profile-language').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < idiomaAll.length; i++) {
                var idioma = idiomaAll[i];
                var lang = idioma.childNodes[0].innerText;
                var level = '';
                if (idioma.childNodes[1]) {
                    level = idioma.childNodes[1].innerText;
                }
                var jsonIdioma = {
                    lang: lang,
                    level: level
                };
                jsonLanguages.push(jsonIdioma);
            }
        } else {
            jsonLanguages = '';
        }

        //Educación
        var jsonEducations = [];
        if (document.getElementById('profile-education')) {
            var educationAll = document.getElementById('profile-education').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < educationAll.length; i++) {
                var education = educationAll[i].childNodes[0];
                var uni = education.childNodes[0].childNodes[0].innerText;
                var eduName = education.childNodes[1].innerText;
                var eduWhen = education.childNodes[2].innerText;
                var jsonEducation = {
                    university: uni,
                    eduName: eduName,
                    eduWhen: eduWhen
                }
            }
        } else {
            jsonEducations = '';
        }

        //Proyectos
        var jsonProjects = [];
        if (document.getElementById('profile-projects')) {
            var projects = document.getElementById('profile-projects').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < projects.length; i++) {
                var project = projects[i];
                var projectName = project.childNodes[0].childNodes[0].innerText;
                var projectTime = project.childNodes[0].childNodes[1].innerText;
                if (project.childNodes[1].className == 'description searchable') {
                    var description = project.childNodes[1].innerText;
                    var jsonProject = {
                        projectName: projectName,
                        projectTime: projectTime,
                        projectDescription: description
                    };
                } else {
                    var jsonProject = {
                        projectName: projectName,
                        projectTime: projectTime,
                    };
                }
                jsonProjects.push(jsonProject);
            }
        } else {
            jsonProjects = '';
        }
        

        //Skills
        var skillsAll = document.getElementById('profile-skills').childNodes[1].childNodes[0].childNodes;
        var jsonSkills = [];
        for (var i = 0; i < skillsAll.length; i++) {
            var skill = skillsAll[i].innerText;
            var jsonSkill = {
                skill: skill
            };
            jsonSkills.push(jsonSkill);
        }

        //Certificados
        var jsonCertificates = [];
        if (document.getElementById('profile-certifications')) {
            var certificates = document.getElementById('profile-certifications').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < certificates.length; i++) {
                var certificado = certificates[i];
                var certName = certificado.childNodes[0].childNodes[0].innerText;
                var licenciaCert = certificado.childNodes[0].childNodes[1].innerText;
                var whenCert = certificado.childNodes[0].childNodes[2].innerText;
                var jsonCertificate = {
                    certName: certName,
                    certLicense: licenciaCert,
                    certWhen: whenCert
                };
                jsonCertificates.push(jsonCertificate);
            }
        } else {
            jsonCertificate = '';
        }
        

        //Premios 
        var jsonAwards = [];
        if (document.getElementById('profile-honors')) {
            var awards = document.getElementById('profile-honors').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < awards.length; i++) {
                var award = awards[i];
                var position = award.childNodes[0].childNodes[0].innerText;
                var organisation = award.childNodes[0].childNodes[1].innerText;
                var awardTime = award.childNodes[0].childNodes[2].innerText;
                var awardDescription = award.childNodes[1].innerText;
                var jsonAward = {
                    position: position,
                    orginisation: organisation,
                    whenAward: awardTime,
                    awardDescription: awardDescription
                };
                jsonAwards.push(jsonAward);
            }
        } else {
            jsonAwards = '';
        }
        

        //Organizaciones de las que forma parte
        var jsonOrgs = [];
        if (document.getElementById('profile-orgs')) {
            var organizaciones = document.getElementById('profile-orgs').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < organizaciones.length; i++) {
                var organizacion = organizaciones[i];
                var orgName = organizacion.childNodes[0].childNodes[0].innerText;
                var positionInOrg = organizacion.childNodes[0].childNodes[1].innerText;
                var timeInOrg = organizacion.childNodes[0].childNodes[2].innerText;
                var jsonOrg = {
                    orgName: orgName,
                    posInOrg: positionInOrg,
                    timeInOrg: timeInOrg
                };
                jsonOrgs.push(jsonOrg);
            }

        } else {
            jsonOrgs = '';
        }

        var jsonVolExps = [];
        var jsonBenefCauses = [];
        if (document.getElementById('profile-volunteer')) {
            //Experiencia de voluntario
            var volunteerExperiences = document.getElementById('profile-volunteer').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < volunteerExperiences.length; i++) {
                var volunteerExperience = volunteerExperiences[i];
                var nameExp = volunteerExperience.childNodes[0].childNodes[0].innerText;
                var orgExp = volunteerExperience.childNodes[0].childNodes[1].innerText;
                var whenExp = volunteerExperience.childNodes[0].childNodes[2].childNodes[0].nodeValue;
                var causeExp = volunteerExperience.childNodes[0].childNodes[2].childNodes[1].innerText;
                var descrExp = ''
                if (volunteerExperience.childNodes[1].childNodes[0]) {
                    descrExp = volunteerExperience.childNodes[1].childNodes[0].nodeValue;
                } else {
                    descrExp = '';
                }
                var jsonExp = {
                    nameExp: nameExp,
                    orgExp: orgExp,
                    whenExp: whenExp,
                    causeExp: causeExp,
                    descrExp: descrExp
                };
                jsonVolExps.push(jsonExp);
            }
            
            //Causas benéficas
            if (document.getElementById('profile-volunteer').childNodes[1].childNodes[1]) {
                var beneficCauses = document.getElementById('profile-volunteer').childNodes[1].childNodes[1].childNodes[1].childNodes;
                for (var i = 0; i < beneficCauses.length; i++) {
                    var beneficCause = beneficCauses[i].innerText;
                    var jsonBenefCause = {
                        beneficCause: beneficCause
                    };
                    jsonBenefCauses.push(jsonBenefCause);
                }
            } else {
                jsonBenefCauses = '';
            }
        } else {
            jsonVolExps = '';
            jsonBenefCauses = '';
        }

        //Recommendations
        var jsonRecs = [];
        if (document.getElementById('profile-recommendations')) {
            var recommendations = document.getElementById('profile-recommendations').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < recommendations.length; i++) {
                var recommendation = recommendations[i];
                var whoRec = recommendation.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerText;
                var posWhoRec = recommendation.childNodes[1].childNodes[0].childNodes[1].childNodes[1].innerText;
                var whereWhoRec = recommendation.childNodes[1].childNodes[0].childNodes[1].childNodes[2].innerText;
                var descrRec = recommendation.childNodes[1].childNodes[0].childNodes[1].childNodes[3].innerText;
                var jsonRec = {
                    whoRecommended: whoRec,
                    positionOfRecomender: posWhoRec,
                    locationOfRecomender: whereWhoRec,
                    recommendation: descrRec
                };
                jsonRecs.push(jsonRec);
            }
        } else {
            jsonRecs = '';
        }

        //Otra formación
        var jsonCourses = [];
        if (document.getElementById('profile-courses')) {
            var courses = document.getElementById('profile-courses').childNodes[1].childNodes;
            for (var i = 0; i < courses.length; i++) {
                if (courses[i].tagName == 'UL') {
                    var coursesAux = courses[i].childNodes;
                    for (var j = 0; j < coursesAux.length; j++) {
                        var course = coursesAux[j].innerText;
                        var jsonCourse = {
                            course: course
                        }
                        jsonCourses.push(jsonCourse);
                    }
                }
            }
        } else {
            jsonCourses = '';
        }

        //Publicaciones de investigación
        var jsonPublications = [];
        if (document.getElementById('profile-publications')) {
            var publications = document.getElementById('profile-publications').childNodes[1].childNodes[0].childNodes;
            for (var i = 0; i < publications.length; i++) {
                var publication = publications[i].innerText;
                var jsonPublication = {
                    publication: publication
                }
                jsonPublications.push(jsonPublication);
            }
        } else {
            jsonPublications = '';
        }
        
        

        var jsonProfile = {
            name: name,
            extract: extract,
            experience: jsonExperience,
            languages: jsonLanguages,
            projects: jsonProject,
            skills: jsonSkills,
            certificates: jsonCertificates,
            awards: jsonAwards,
            orgs: jsonOrgs,
            volExps: jsonVolExps,
            beneficCauses: jsonBenefCauses,
            recommendations: jsonRecs,
            courses: jsonCourses,
            publications: jsonPublications
        };
        //var profile = [name, actualJob, actualCompany, location, connections, experience, skills];
        sendResponse(jsonProfile);
        //sendResponse(profile); //profile-content
    });
  
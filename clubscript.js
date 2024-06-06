document.addEventListener("DOMContentLoaded", function() {
    // Load XML data
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parseXML(this);
        }
    };
    xmlhttp.open("GET", "clubs_and_events.xml", true);
    xmlhttp.send();
});

function parseXML(xml) {
    var xmlDoc = xml.responseXML;
    var clubs = xmlDoc.getElementsByTagName("club");
    var clubsDiv = document.getElementById("clubs");

    // Display clubs and their events
    for (var i = 0; i < clubs.length; i++) {
        var club = clubs[i];
        var clubDiv = document.createElement("div");
        clubDiv.classList.add("club");
        clubDiv.innerHTML = "<h2 onclick=\"toggleEvents(this)\">" + club.getElementsByTagName("name")[0].childNodes[0].nodeValue + "</h2>";
        clubDiv.innerHTML += "<p>" + club.getElementsByTagName("description")[0].childNodes[0].nodeValue + "</p>";
        
        var eventsDiv = document.createElement("div");
        eventsDiv.classList.add("events");
        clubDiv.appendChild(eventsDiv);

        var events = club.getElementsByTagName("event");
        for (var j = 0; j < events.length; j++) {
            var event = events[j];
            var eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            eventDiv.innerHTML = "<h3>" + event.getElementsByTagName("name")[0].childNodes[0].nodeValue + "</h3>";
            eventDiv.innerHTML += "<p>Date: " + event.getElementsByTagName("date")[0].childNodes[0].nodeValue + "</p>";
            eventDiv.innerHTML += "<p>Description: " + event.getElementsByTagName("description")[0].childNodes[0].nodeValue + "</p>";
            eventsDiv.appendChild(eventDiv);
        }
        eventsDiv.style.display = "none"; // Hide events initially
        clubsDiv.appendChild(clubDiv);
    }
}

function toggleEvents(element) {
    var eventsDiv = element.nextElementSibling;
    if (eventsDiv.style.display === "none") {
        eventsDiv.style.display = "block";
    } else {
        eventsDiv.style.display = "none";
    }
}


import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Prediction deadline
const DEADLINE = new Date("2026-07-08T23:59:00");

const teams = [

    ["", "Argentina"],
    ["", "Belgium"],
    ["", "Colombia"],
    ["", "Egypt"],
    ["", "England"],
    ["", "France"],
    ["", "Morocco"],
    ["", "Norway"],
    ["", "Spain"],
    ["", "Switzerland"]

];


let selected = null;


const box = document.getElementById("teams");


teams.forEach(team => {

    let div = document.createElement("div");

    div.className = "team";

    div.innerHTML = team[0] + " " + team[1];


    div.onclick = () => {

        selected = team[1];

        document.querySelectorAll(".team")
        .forEach(x => x.style.background="white");

        div.style.background="#dbeafe";

    };


    box.appendChild(div);

});


function checkDeadline(){

    const now = new Date();

    const button =
    document.getElementById("submitBtn");

    const message =
    document.getElementById("message");


    if(now >= DEADLINE){

        button.disabled = true;

        message.innerHTML =
        "⏰ Predictions are closed. Good luck everyone!";

        return false;

    }

    return true;

}

async function submitPrediction(){

  if(!checkDeadline()){
    return;
}

    let name =
    document.getElementById("name").value;



    if(!name || !selected){

        alert("Please complete your prediction");
        return;

    }


    await addDoc(collection(db,"predictions"),{

    name:name,
    team:selected,
    revealed:false,
    time:new Date()

});


    document.getElementById("message").innerHTML =
    "✅ Your prediction is locked! Nobody can see it until the reveal.";

}



document
.getElementById("submitBtn")
.addEventListener("click", submitPrediction);

function updateTimer(){

    const now = new Date();

    const distance =
    DEADLINE - now;


    const timer =
    document.getElementById("timer");


    if(distance <= 0){

        timer.innerHTML = "Closed";

        return;

    }


    const days =
    Math.floor(distance / (1000*60*60*24));


    const hours =
    Math.floor(
    (distance / (1000*60*60)) % 24
    );


    const minutes =
    Math.floor(
    (distance / (1000*60)) % 60
    );


    timer.innerHTML =
    `${days} days ${hours} hours ${minutes} minutes`;

}


setInterval(updateTimer,1000);

updateTimer();
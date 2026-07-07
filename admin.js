import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Change this password whenever you want
const ADMIN_PASSWORD = "football2026";


let predictions = [];


// Login button

document
.getElementById("loginBtn")
.onclick = async () => {


    let password =
    document.getElementById("password").value;


    if(password !== ADMIN_PASSWORD){

        alert("Wrong password");
        return;

    }


    document.getElementById("loginBox")
    .style.display = "none";


    document.getElementById("dashboard")
    .style.display = "block";


    loadPredictions();

};




// Load predictions from Firestore

async function loadPredictions(){


    const snapshot =
    await getDocs(collection(db,"predictions"));


    let table =
    document.getElementById("results");


    table.innerHTML = "";


    predictions = [];


    let count = 0;



    snapshot.forEach(doc => {


        let data = doc.data();


        predictions.push({

            name: data.name,
            team: data.team

        });



        let row =
        document.createElement("tr");


        row.innerHTML =

        `
        <td>${data.name}</td>
        <td>${data.team}</td>
        `;


        table.appendChild(row);


        count++;


    });



    document.getElementById("count")
    .innerHTML = count;


}




// Export CSV

document
.getElementById("exportBtn")
.onclick = () => {


    let csv = "Name,Champion\n";


    predictions.forEach(p => {


        csv += `${p.name},${p.team}\n`;


    });



    let blob =
    new Blob(
        [csv],
        {type:"text/csv"}
    );



    let url =
    URL.createObjectURL(blob);



    let link =
    document.createElement("a");


    link.href = url;


    link.download =
    "champion-predictions.csv";


    link.click();


};
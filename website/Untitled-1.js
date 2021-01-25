// const { response } = require("express");

/* Global Variables */
const button = document.getElementById('generate'),
    zipCodeValue = document.getElementById('zip'),
    date = document.getElementById('date'),
    temp = document.getElementById('temp'),
    content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Phoenix&appid=3bc0528166321016e15696f8f027edd0';

const getRequest = async () => {
    const request = await fetch(apiUrl);
    // console.log("Ay 7aga");
    try {
        const response = await request.json();
        return response;
        // console.log(response);
    } catch (err) {
        console.log(err);
    }
}


const postRequest = async (url = "", data = {}) => {
    const request = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    // console.log(request);
    try {
        return;
    } catch (err) {
        console.log(err);
    }
}

const UpdatData = async () => {
    const request = await fetch("/data");
    try {
        const response = await request.json();
        date.innerHTML = response.date;

        // date.innerHTML = response.
    } catch (err) {
        console.log(err);
    }
}

button.addEventListener('click', doAction);

function doAction() {
    // zipCode Value validation
    if (zipCodeValue.value === "") {
        alert("Please enter zip code first then click button")
    } else {
        getRequest();
        postRequest("/addTheRequiredData");
        UpdatData();
    }
    // get data from external api
}
/* Global Variables */
const generateButton = document.getElementById('generate'),
    zip = document.getElementById('zip'),
    feelings = document.getElementById('feelings'),
    date = document.getElementById('date'),
    temp = document.getElementById('temp'),
    content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=metric&appid=3bc0528166321016e15696f8f027edd0';
const zipcode = zip.value;
const API = apiUrl + zipcode + apiKey;

const getData = async (API) => {
    const request = await fetch(API);
    try {
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const postData = async (url = '', data = {}) => {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return (newData);
    } catch (error) {
        console.log(error);
    }
}

const UpdateData = async () => {
    const req = await fetch('/all');
    try {
        const res = await req.json();
        console.log(res);
        date.innerHTML = `Date: ${res.date}`;
        temp.innerHTML = `Temp: ${res.temp}`;
        content.innerHTML = `I feel I am: ${res.content}`;
    } catch (error) {
        console.log(error);
    }
}

generateButton.addEventListener('click', performAction);

function performAction() {
    if (zip.value == '') {
        alert('please Enter zip code');
    } else {
        // Here is the Problem
        // console.log(zipcode);  // empty string
        getData(API).then((data) => {
            // console.log(data.main.temp);      // log undefined
            postData('/addData', { date: d, temp: data.main.temp, content: feelings.value })
        }).then(() => UpdateData());
    }
}
/* Global Variables */
const generateButton = document.getElementById('generate'),
    zipCode = document.getElementById('zip'),
    feelings = document.getElementById('feelings'),
    date = document.getElementById('date'),
    temp = document.getElementById('temp'),
    content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=85005&units=metric&appid=3bc0528166321016e15696f8f027edd0`;

const getData = async () => {
    const request = await fetch(apiUrl);
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
        date.innerHTML += res[0].date;
        temp.innerHTML += res[0].temp;
        content.innerHTML += res[0].content;
    } catch (error) {
        console.log(error);
    }
}

generateButton.addEventListener('click', performAction);

function performAction() {
    if (zipCode.value == '') {
        alert('please Enter zip code');
    } else {
        getData().then((data) => {
            postData('/addData', { date: d, temp: data.main.temp, content: feelings.value })
        }).then(() => UpdateData());
    }
}
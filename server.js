// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
// Setup Server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));



app.get('/all', (req, res) => {
    res.send(projectData);
    projectData = [];
});

app.post('/addData', (req, res) => {
    console.log(req.body);
    var newData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData = newData;
});


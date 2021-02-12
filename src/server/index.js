const dotenv = require('dotenv');
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
var bodyParser = require('body-parser');
var cors = require('cors');

dotenv.config();

const API_KEY = process.env.API_KEY;

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static('dist'));

console.log(JSON.stringify(mockAPIResponse));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

//send api key to client side
app.post('/get_data', (req, res) => {
    return { API_KEY };
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

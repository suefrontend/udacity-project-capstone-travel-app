const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js');
const cors = require('cors');
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

const geoNamesKey = process.env.USER_NAME_GEONAMES;
const weatherBitApiKey = process.env.API_KEY_WEATHERBIT;
const pixabayApiKey = process.env.API_KEY_PIXABAY;

console.log('geoNamesKey', geoNamesKey);
console.log('weatherBitApiKey', weatherBitApiKey);
console.log('pixabayApiKey', pixabayApiKey);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
	res.sendFile(path.resolve('dist/index.html'));
});

app.get('/test', function (req, res) {
	res.send(mockAPIResponse);
});

let userInput = [];

// app.post('/api', async function (req, res) {
// 	userInput = req.body.url;
// 	const response = await fetch(
// 		`${baseURL}key=${apiKey}&url=${userInput}&lang=en`
// 	);
// 	const data = await response.json();

// 	res.send(data);
// });

let projectData = {};

app.post('/add', function (req, res) {
	projectData['depCity'] = req.body.depCity;
	projectData['arrCity'] = req.body.arrCity;
	projectData['depDate'] = req.body.depDate;
	projectData['weather'] = req.body.weather;
	projectData['daysLeft'] = req.body.daysLeft;
	res.send(projectData);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
	console.log('Example app listening on port 8081!');
});

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.API_KEY;
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
console.log(`Your API key is ${process.env.API_KEY}`);

console.log(__dirname);

app.get('/', function (req, res) {
	res.sendFile(path.resolve('dist/index.html'));
});

app.get('/test', function (req, res) {
	res.send(mockAPIResponse);
});

let userInput = [];

app.post('/api', async function (req, res) {
	userInput = req.body.url;
	const response = await fetch(
		`${baseURL}key=${apiKey}&url=${userInput}&lang=en`
	);
	const data = await response.json();

	res.send(data);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
	console.log('Example app listening on port 8081!');
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

/* Middleware*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

let projectData = {};
let arr = [];

app.get('/', function (req, res) {
	res.sendFile(path.resolve('dist/index.html'));
});

app.get('/all', function (req, res) {
	res.send(arr);
});

app.post('/save', function (req, res) {
	const reqBody = req.body;

	if (!reqBody || !reqBody.trip) {
		return status(400).send('Invalid Request');
	}

	arr.push(reqBody.trip);

	res.status(200).send(arr);
});

// Setup Server
app.listen(process.env.PORT || 3000, () => console.log('Listening to 3000'));

process.env.HEROKU;

module.exports = app;

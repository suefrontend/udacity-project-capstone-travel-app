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

app.get('/', function (req, res) {
	res.sendFile(path.resolve('dist/index.html'));
});

app.post('/add', function (req, res) {
	projectData = {
		depCity: req.body.depCity,
		arrCity: req.body.arrCity,
		depDate: req.body.depDate,
		weather: req.body.weather,
		daysLeft: req.body.daysLeft,
		tripImage: req.body.tripImage,
	};

	// projectData['depCity'] = req.body.depCity;
	// projectData['arrCity'] = req.body.arrCity;
	// projectData['depDate'] = req.body.depDate;
	// projectData['weather'] = req.body.weather;
	// projectData['daysLeft'] = req.body.daysLeft;
	res.send(projectData);
});

// Setup Server
app.listen(3000, () => console.log('Listening to 3000'));

module.exports = app;

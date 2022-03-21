import { saveTrip } from './saveTrip';
import { updateUI } from './updateUI';

const geoNamesKey = 'kaya0312';
const weatherBitApiKey = '164014afe4334428a208da61da810de3';
const pixabayApiKey = '26229455-f26c341619c4e41b25358fe40';

const timestampNow = Date.now() / 1000;

const handleSubmit = async (event) => {
	event.preventDefault();

	const origin = document.getElementById('origin').value;
	const destination = document.getElementById('destination').value;
	const departingDate = document.querySelector('input[name="date"]').value;
	const timestamp = new Date(departingDate).getTime() / 1000;

	const geoData = await getGeoDetails(destination);

	// .then((data) => {
	const lat = geoData.geonames[0].lat;
	const long = geoData.geonames[0].lng;
	const country = geoData.geonames[0].countryName;

	console.log(lat, long, country);

	const weatherData = await getWeatherData(lat, long, country, timestamp);
	const image = await getImage(pixabayApiKey, destination);
	const tripImage = image.hits[0].webformatURL;
	console.log('weatherData', weatherData, tripImage);
	// 	const weatherData = getWeatherData(lat, long, country, timestamp);
	// 	return weatherData;
	// })
	// .then((weatherData) => {
	// 	const image = getImage(pixabayApiKey, destination);
	// 	console.log('image', image);
	// 	return image;
	// })

	// .then((image) => {
	const daysLeft = Math.round((timestamp - timestampNow) / 86400);
	// 	console.log('image', image);
	const userInput = postData('http://localhost:3000/add', {
		origin,
		destination,
		departingDate,
		weather: (weatherData.data[15].temp * 9) / 5 + 32,
		daysLeft,
		tripImage,
	});
	// return userInput;
	// })
	// .then((userInput) => {
	updateUI(await userInput);
	localStorage.setItem(localStorage.length, JSON.stringify(await userInput));
	// });

	// saveTrip();
};

const getGeoDetails = async (destination) => {
	const response = await fetch(
		`http://api.geonames.org/searchJSON?q=${destination}&maxRows=10&username=${geoNamesKey}`
	);

	try {
		return await response.json();
	} catch (error) {
		console.log('Error: ', error);
	}
};

const getWeatherData = async (lat, lng) => {
	const response = await fetch(
		`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherBitApiKey}`
	);

	try {
		return await response.json();
	} catch (error) {
		console.log('Error: ', error);
	}
};

const getImage = async (api, destination) => {
	const response = await fetch(
		`https://pixabay.com/api/?key=${pixabayApiKey}&q=${destination}+city&image_type=photo`
	);

	try {
		return await response.json();
	} catch (error) {
		console.log('Error: ', error);
	}
};

const postData = async (url = '', data = {}) => {
	const req = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify({
			depCity: data.origin,
			arrCity: data.destination,
			depDate: data.departingDate,
			weather: data.weather,
			daysLeft: data.daysLeft,
			tripImage: data.tripImage,
		}),
	});
	try {
		const userInput = await req.json();
		console.log('userInput', userInput);
		return userInput;
	} catch (error) {
		console.log('error'), error;
	}
};

export { handleSubmit };

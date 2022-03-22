import { saveTrip } from './saveTrip';
import { updateUI } from './updateUI';

const geoNamesKey = 'kaya0312';
const weatherBitApiKey = '164014afe4334428a208da61da810de3';
const pixabayApiKey = '26229455-f26c341619c4e41b25358fe40';

const timestampNow = Date.now() / 1000;

const trip = {};

const handleSubmit = async (event) => {
	event.preventDefault();

	// const origin = document.getElementById('origin').value;
	const destination = document.getElementById('destination').value;
	const departingDate = document.querySelector(
		'input[name="departing-date"]'
	).value;
	const returningDate = document.querySelector(
		'input[name="returning-date"]'
	).value;
	const tripLength =
		returningDate.split('-').join('') - departingDate.split('-').join('');
	console.log('tripLength', tripLength);

	const timestamp = new Date(departingDate).getTime() / 1000;

	const geoData = await getGeoDetails(destination);

	// .then((data) => {
	const lat = geoData.geonames[0].lat;

	const long = geoData.geonames[0].lng;
	const country = geoData.geonames[0].countryName;

	// console.log(lat, long, country);

	const weatherData = await getWeatherData(lat, long, country, timestamp);

	const image = await getImage(pixabayApiKey, destination);

	// 	const weatherData = getWeatherData(lat, long, country, timestamp);
	// 	return weatherData;
	// })
	// .then((weatherData) => {
	// 	const image = getImage(pixabayApiKey, destination);
	// 	console.log('image', image);
	// 	return image;
	// })

	// .then((image) => {

	// const lowTemp = weatherData
	console.log('weatherData', weatherData.data);
	let highTemp = weatherData.data[0].max_temp;
	let lowTemp = weatherData.data[0].min_temp;
	let weather = weatherData.data[0].weather.description;
	console.log('weather', weather);

	const daysLeft = Math.round((timestamp - timestampNow) / 86400);
	// 	console.log('image', image);
	// const userInput = postData('http://localhost:3000/add', {
	// 	origin,
	// 	destination,
	// 	departingDate,
	// 	weather: (weatherData.data[15].temp * 9) / 5 + 32,
	// 	daysLeft,
	// 	tripImage,
	// });

	trip.destination = destination;
	trip.depDate = departingDate;
	// trip.weather = (weatherData.data[15].temp * 9) / 5 + 32;
	// trip.temperature = weatherData.data[15].temp;
	trip.daysLeft = daysLeft;
	trip.tripImage = image.hits[0].webformatURL;

	trip.highTemp = highTemp;
	trip.lowTemp = lowTemp;
	trip.weather = weather;

	trip.retDate = returningDate;
	trip.tripLength = tripLength;

	console.log('departingDate', departingDate);
	// return userInput;
	// })
	// .then((userInput) => {
	updateUI(trip);
	// localStorage.setItem(localStorage.length, JSON.stringify(await userInput));
	// saveTrip(await userInput);
	// });

	document.getElementById('destination').value = '';
	document.querySelector('input[name="departing-date"]').value = '';
	document.querySelector('input[name="returning-date"]').value = '';
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

const addTrip = async () => {
	const response = await fetch('http://localhost:3000/save', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			arrCity: trip.destination,
			depDate: trip.departingDate,
			daysLeft: trip.daysLeft,
			tripImage: trip.tripImage,

			weather: trip.weather,
			lowTemp: trip.lowTemp,
			highTemp: trip.highTemp,

			returningDate: trip.retDate,
			tripLength: trip.tripLength,
		}),
	});
	console.log('response', response);
	try {
		const userInput = await response.json();
		console.log('userInput', userInput);
		renderSavedTripRelatedFunction(userInput.destination);
		return userInput;
		// console.log('response', response);
		// if (response.ok) {
		// 	console.log('OK');
		// 	const jsonRes = await response.json();
		// 	// displayTrip(jsonRes);
		// 	return jsonRes;
		// }
	} catch (error) {
		console.log(error);
	}
};

const renderSavedTripRelatedFunction = () => {
	console.log('trip', trip);

	// addTrip();

	// document.querySelector('.cards').innerHTML = '';

	let markup;

	markup = `
	      <div class="card">
	        <div class="card__img">
	          <figure><img src=${trip.tripImage} alt="" /></figure>
	        </div>
	        <div class="card__content">
	          <p>My trip to: ${trip.destination}</p>
	          <p>Departing: ${trip.depDate}</p>
	          <p>Returning: ${trip.retDate}</p>
	          <p>Length of trip: ${trip.tripLength} days</p>

	          <p>Your travel is ${trip.daysLeft} away</p>
	          <p>Typical weather for then is:</p>
	          <p>High ${trip.highTemp}, Low ${trip.lowTemp}</p>
	          <p>${trip.weather}</p>
	        </div>
	      </div>
	    `;

	document.querySelector('.cards').insertAdjacentHTML('afterbegin', markup);
	closeModal();
};

const closeModal = () => {
	document.querySelector('.modal').style.display = 'none';
};

const displayTrip = (trip) => {
	document.querySelector('.modal').style.display = 'none';
};

const saveTripBtn = document.getElementById('save-btn');
saveTripBtn.addEventListener('click', renderSavedTripRelatedFunction);

const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', closeModal);

window.addEventListener('load', async function () {
	const res = await fetch('http://localhost:3000/all');

	try {
		const data = await res.json();
		rendering(data);
		console.log('data', data);
	} catch (e) {
		console.log('error', e);
	}
});

const rendering = (test) => {
	let markup;

	test.map((el) => {
		markup = `
      <div class="card">
        <div class="card__img">
          <figure><img src=${el.tripImage} alt="" /></figure>
        </div>
        <div class="card__content">
          <p>My trip to: ${el.arrCity}</p>
          <p>Departing: ${el.depDate}</p>

          <p>Your travel is ${el.daysLeft} away</p>
          <p>Typical weather for then is:</p>
          <p>High ${el.highTemp}, Low ${el.lowTemp}</p>
          <p>${el.weather}</p>
        </div>
      </div>
    `;

		document.querySelector('.cards').insertAdjacentHTML('afterbegin', markup);
	});
};

export { handleSubmit };

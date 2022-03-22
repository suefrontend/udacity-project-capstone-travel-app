import { saveTrip } from './saveTrip';
import { updateUI } from './updateUI';

const geoNamesKey = 'kaya0312';
const weatherBitApiKey = '164014afe4334428a208da61da810de3';
const pixabayApiKey = '26229455-f26c341619c4e41b25358fe40';

const timestampNow = Date.now() / 1000;

const trip = {};

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

	trip.origin = origin;
	trip.destination = destination;
	trip.depDate = departingDate;
	// trip.weather = (weatherData.data[15].temp * 9) / 5 + 32;
	trip.temperature = weatherData.data[15].temp;
	trip.daysLeft = daysLeft;
	trip.tripImage = image.hits[0].webformatURL;

	console.log('trip', trip);
	// return userInput;
	// })
	// .then((userInput) => {
	updateUI(trip);
	// localStorage.setItem(localStorage.length, JSON.stringify(await userInput));
	// saveTrip(await userInput);
	// });
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

const addTrip = async (event) => {
	event.preventDefault();
	// const req = await fetch(url, {
	// 	method: 'POST',
	// 	credentials: 'same-origin',
	// 	headers: {
	// 		'Content-Type': 'application/json;charset=UTF-8',
	// 	},
	// 	body: JSON.stringify({
	// 		depCity: data.origin,
	// 		arrCity: data.destination,
	// 		depDate: data.departingDate,
	// 		weather: data.weather,
	// 		daysLeft: data.daysLeft,
	// 		tripImage: data.tripImage,
	// 	}),
	// });
	// try {
	// 	const userInput = await req.json();
	// 	console.log('userInput', userInput);
	// 	return userInput;
	// } catch (error) {
	// 	console.log('error'), error;
	// }

	console.log('OK');
	const response = await fetch('http://localhost:3000/save', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			depCity: trip.origin,
			arrCity: trip.destination,
			depDate: trip.departingDate,
			weather: trip.weather,
			daysLeft: trip.daysLeft,
			tripImage: trip.tripImage,
		}),
	});
	console.log('response', response);
	try {
		const userInput = await response.json();
		console.log('userInput', userInput);
		renderSavedTrips(userInput);
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

// const addTrip = async () => {
// 	const res = await fetch('http://localhost:3000/all');
// 	try {
// 		const data = await res.json();
// 		console.log('data', data);
// 	} catch (e) {
// 		console.log('error', e);
// 	}
// };

const closeModal = () => {
	document.querySelector('.modal').style.display = 'none';
};

const renderSavedTrips = () => {
	document.querySelector('.modal').style.display = 'none';

	const section = document.createElement('section');
	section.classList.add('trips');

	const div = document.createElement('div');

	div.innerHTML = `
  <div class="card mb-3" style="max-width: 768px; margin: 0 auto">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${trip.tripImage}" class="card-img" alt="Picture of Travel Destination">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <span class="trip_countdown">Your trip to ${trip.destination} is days away</span>
        </div>
      </div>
    </div>
  </div>`;

	section.appendChild(div);
	document.querySelector('.trips').appendChild(section);
};

const saveTripBtn = document.getElementById('save-btn');
saveTripBtn.addEventListener('click', addTrip);

const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', closeModal);

export { handleSubmit };

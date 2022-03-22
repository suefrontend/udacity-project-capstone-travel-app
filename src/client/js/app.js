import { renderModal, renderSavedTrip } from './updateUI';

const geoNamesKey = 'kaya0312';
const weatherBitApiKey = '164014afe4334428a208da61da810de3';
const pixabayApiKey = '26229455-f26c341619c4e41b25358fe40';

const trip = {};

export const handleSubmit = async (event) => {
	event.preventDefault();

	try {
		// Get form values
		const destination = document.getElementById('destination').value;
		const departingDate = document.querySelector(
			'input[name="departing-date"]'
		).value;
		const returningDate = document.querySelector(
			'input[name="returning-date"]'
		).value;

		// Format date
		const departingDateFormat = departingDate.split('-').join('');
		const returningDateFormat = returningDate.split('-').join('');

		const tripLength = returningDateFormat - departingDateFormat;

		// Validation for returning date
		if (departingDateFormat > returningDateFormat) {
			alert('Returning date must be later than departing date');
			return;
		}

		const timestamp = new Date(departingDate).getTime() / 1000;
		const timestampNow = Date.now() / 1000;
		const daysLeft = Math.round((timestamp - timestampNow) / 86400);

		// Get geo date
		const geoData = await getGeoDetails(destination);

		const lat = geoData.geonames[0].lat;
		const long = geoData.geonames[0].lng;
		const country = geoData.geonames[0].countryName;

		// Get weather data
		const weatherData = await getWeatherData(lat, long, country, timestamp);

		let highTemp = weatherData.data[0].max_temp;
		let lowTemp = weatherData.data[0].min_temp;
		let weather = weatherData.data[0].weather.description;

		// Get image of destination city
		const image = await getImage(pixabayApiKey, destination);

		// Set trip
		trip.destination = destination;
		trip.depDate = departingDate;
		trip.daysLeft = daysLeft;
		trip.tripImage = image.hits[0].webformatURL;
		trip.highTemp = highTemp;
		trip.lowTemp = lowTemp;
		trip.weather = weather;
		trip.retDate = returningDate;
		trip.tripLength = tripLength;

		renderModal(trip);

		// Empty inputs after submission
		document.getElementById('destination').value = '';
		document.querySelector('input[name="departing-date"]').value = '';
		document.querySelector('input[name="returning-date"]').value = '';

		return trip;
	} catch (error) {
		alert('Please enter valid destination');
	}
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
export async function handleSaveTrip(e) {
	e.preventDefault();
	console.log('trip', trip);

	try {
		const response = await fetch('http://localhost:3000/save', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({ trip: trip }),
		});

		if (!response.ok) {
			return null;
		}

		let savedTrips = await response.json();

		const newTrip = savedTrips[savedTrips.length - 1];

		renderSavedTrip(newTrip);

		return savedTrips;
	} catch (error) {
		console.log(error);
	}
}

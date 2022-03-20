const geoNamesKey = 'kaya0312';
const weatherBitApiKey = '164014afe4334428a208da61da810de3';
const pixabayApiKey = '26229455-f26c341619c4e41b25358fe40';

const timestampNow = Date.now() / 1000;

const handleSubmit = (event) => {
	event.preventDefault();

	const origin = document.getElementById('origin').value;
	const destination = document.getElementById('destination').value;
	const departingDate = document.querySelector('input[name="date"]').value;
	const timestamp = new Date(departingDate).getTime() / 1000;

	getGeoDetails(destination)
		.then((data) => {
			const lat = data.geonames[0].lat;
			const long = data.geonames[0].lng;
			const country = data.geonames[0].countryName;
			const weatherData = getWeatherData(lat, long, country, timestamp);
			return weatherData;
		})
		.then((weatherData) => {
			const daysLeft = Math.round((timestamp - timestampNow) / 86400);
			const userInput = postData('http://localhost:8081/add', {
				origin,
				destination,
				departingDate,
				weather: (weatherData.data[15].temp * 9) / 5 + 32,
				daysLeft,
			});
			return userInput;
		})
		.then((userInput) => {
			updateUI(userInput);
		});
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

const updateUI = async (userInput) => {
	console.log('userInput', userInput);
	const res = await fetch(
		`https://pixabay.com/api/?key=${pixabayApiKey}&q=${userInput.arrCity}+city&image_type=photo`
	);

	try {
		const image = await res.json();
		const formatDate = userInput.depDate.split('_').reverse().join(' / ');

		document
			.querySelector('#destination-img')
			.setAttribute('src', image.hits[0].webformatURL);
		document.getElementById('city').innerHTML = userInput.arrCity;
		document.getElementById('date').innerHTML = formatDate;
		document.getElementById('days-left').innerHTML = userInput.daysLeft;
		document.getElementById('destination-weather').innerHTML =
			userInput.weather;
	} catch (error) {
		console.log('error', error);
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
		}),
	});
	try {
		const userInput = await req.json();
		return userInput;
	} catch (error) {
		console.log('error'), error;
	}
};

export { handleSubmit };

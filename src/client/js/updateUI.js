export const updateUI = async (userInput) => {
	console.log('userInput', userInput);

	document.querySelector('.modal').style.display = 'block';
	// const res = await fetch(
	// 	`https://pixabay.com/api/?key=${api}&q=${userInput.arrCity}+city&image_type=photo`
	// );

	try {
		// const image = await res.json();
		const formatDateDeparting = userInput.depDate
			.split('_')
			.reverse()
			.join(' / ');
		const formatDateReturning = userInput.retDate
			.split('_')
			.reverse()
			.join(' / ');

		// .querySelector('#destination-img')
		// .setAttribute('src', image.hits[0].webformatURL);
		document
			.querySelector('#destination-img')
			.setAttribute('src', userInput.tripImage);
		document.getElementById('city').innerHTML = userInput.destination;

		document.getElementById('departing-date').innerHTML = formatDateDeparting;
		document.getElementById('returning-date').innerHTML = formatDateReturning;

		document.getElementById('trip-length').innerHTML =
			userInput.tripLength + ' days';

		document.getElementById('days-left').innerHTML = userInput.daysLeft;
		document.getElementById('destination-temperature-high').innerHTML =
			userInput.highTemp;
		document.getElementById('destination-temperature-low').innerHTML =
			userInput.lowTemp;
		document.getElementById('destination-weather').innerHTML =
			userInput.weather;
	} catch (error) {
		console.log('error', error);
	}
};

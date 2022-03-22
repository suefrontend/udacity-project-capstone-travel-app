export const renderModal = async (userInput) => {
	document.querySelector('.modal').style.display = 'block';

	try {
		const formatDateDeparting = userInput.depDate
			.split('_')
			.reverse()
			.join(' / ');
		const formatDateReturning = userInput.retDate
			.split('_')
			.reverse()
			.join(' / ');

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

export const closeModal = () => {
	document.querySelector('.modal').style.display = 'none';
};
export const renderSavedTrip = async (trip) => {
	let markup = `
	      <div class="card">
	        <div class="card__img">
	          <figure><img src=${trip.tripImage} alt=${trip.destination} /></figure>
	        </div>
	        <div class="card__content">
	          <p class="bold">My trip to: ${trip.destination}</p>
	          <p class="bold">Departing: ${trip.depDate}</p>
	          <p class="bold">Returning: ${trip.retDate}</p>
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

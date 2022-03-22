export const updateUI = async (userInput) => {
	console.log('userInput', userInput);

	document.querySelector('.modal').style.display = 'block';
	// const res = await fetch(
	// 	`https://pixabay.com/api/?key=${api}&q=${userInput.arrCity}+city&image_type=photo`
	// );

	try {
		// const image = await res.json();
		const formatDate = userInput.depDate.split('_').reverse().join(' / ');

		// .querySelector('#destination-img')
		// .setAttribute('src', image.hits[0].webformatURL);
		document
			.querySelector('#destination-img')
			.setAttribute('src', userInput.tripImage);
		document.getElementById('city').innerHTML = userInput.arrCity;
		document.getElementById('date').innerHTML = formatDate;
		document.getElementById('days-left').innerHTML = userInput.daysLeft;
		document.getElementById('destination-weather').innerHTML =
			userInput.weather;
	} catch (error) {
		console.log('error', error);
	}
};

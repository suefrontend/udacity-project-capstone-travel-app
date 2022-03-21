export const saveTrip = () => {
	const origin = document.getElementById('origin').value;
	const destination = document.getElementById('destination').value;
	const departingDate = document.querySelector('input[name="date"]').value;
	const timestamp = new Date(departingDate).getTime() / 1000;

	let trip = {
		depCity: origin,
		arrCity: destination,
		depDate: departingDate,
		weather: 'sunny',
		daysLeft: '30',
	};

	localStorage.setItem(localStorage.length, JSON.stringify(trip));
};

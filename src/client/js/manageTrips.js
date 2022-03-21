let destinationsArray;

if (localStorage.getItem('destination')) {
	destinationsArray = JSON.parse(localStorage.getItem('destination'));
} else {
	destinationsArray = [];
}

localStorage.setItem('destination', JSON.stringify(destinationsArray));

const dataStorage = JSON.parse(localStorage.getItem('destination'));

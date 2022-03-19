import { checkForName } from './js/nameChecker';
import { handleSubmit } from './js/formHandler';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

document.getElementById('form').addEventListener('submit', handleSubmit);

document.getElementById('form').addEventListener('submit', function (e) {
	e.preventDefault();
	let formInput = document.getElementById('url').value;
	checkForName(formInput);
});

export { checkForName, handleSubmit };

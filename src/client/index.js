import { handleSubmit, handleSaveTrip } from './js/app';
import { closeModal, renderSavedTrip } from './js/updateUI';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/card.scss';
import './styles/button.scss';
import './styles/modal.scss';
import './styles/utility.scss';
import './styles/page.scss';

document.getElementById('form').addEventListener('submit', handleSubmit);

document.getElementById('save-btn').addEventListener('click', handleSaveTrip);

document.getElementById('close-btn').addEventListener('click', closeModal);

export { handleSubmit, renderSavedTrip, closeModal };

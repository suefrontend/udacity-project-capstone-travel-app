import { handleSubmit } from './js/app';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/modal.scss';
import './styles/utility.scss';

document.getElementById('form').addEventListener('submit', handleSubmit);

export { handleSubmit };

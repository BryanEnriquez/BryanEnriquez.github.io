import emailjs from '@emailjs/browser';
import icons from '../images/icons.svg';

const headerEl = document.querySelector('.header') as HTMLElement;
const navbarEl = document.querySelector('.navbar') as HTMLElement;
const navBtnBoxEl = document.getElementById(
  'navbar__btnBox--js'
) as HTMLDivElement;
const navUseEl = document.getElementById('navbar-icon--js') as HTMLElement;
const homeEl = document.querySelector('.section--home') as HTMLElement;
const arrowDownEl = document.getElementById(
  'icon-arrow-down--js'
) as HTMLElement & SVGElement;
const overlayEl = document.querySelector('.overlay') as HTMLElement;

setTimeout(() => {
  const cn = arrowDownEl.classList[0];
  arrowDownEl.classList.add(`${cn}--visible`);
}, 1800);

let navClosed = true;

function updateNav(action = 'toggle') {
  if (action === 'toggle') {
    navUseEl.setAttribute(
      'href',
      `${icons}#icon-${navClosed ? 'x' : 'three-lines'}`
    );

    overlayEl.classList.toggle('overlay--hidden');
    headerEl.classList.toggle('header--max');
    navClosed = !navClosed;
    return;
  }

  if (navClosed) return;

  navUseEl.setAttribute('href', `${icons}#icon-three-lines`);
  headerEl.classList.remove('header--max');
  overlayEl.classList.add('overlay--hidden');
  navClosed = true;
}

function scrollToX(x: number) {
  window.scrollTo({ top: x });
}

navbarEl.addEventListener('click', function (e) {
  if (!(e.target instanceof Element)) return;

  const buttonEl = e.target.closest('#navbar__btn--js');

  if (buttonEl) return updateNav();

  const link = e.target.getAttribute('href');

  if (!link) return;

  updateNav('close');

  const linkEl = document.getElementById(link.slice(1));

  if (linkEl) {
    scrollToX(linkEl.offsetTop - navBtnBoxEl.getBoundingClientRect().height);
  }
});

arrowDownEl.addEventListener('click', function () {
  scrollToX(
    homeEl.getBoundingClientRect().height -
      headerEl.getBoundingClientRect().height
  );
});

overlayEl.addEventListener('click', function () {
  overlayEl.classList.add('overlay--hidden');
  updateNav('close');
});

// FORM LOGIC /////////////////////

const formEl = document.getElementById('contact-form--js') as HTMLFormElement;
const nameEl = document.getElementById('name') as HTMLInputElement;
const emailEl = document.getElementById('email') as HTMLInputElement;
const messageEl = document.getElementById('message') as HTMLInputElement;
const formBtnEl = document.getElementById('form-btn--js') as HTMLButtonElement;
const formInputs = [nameEl, emailEl, messageEl];

emailjs.init('gSeSiP9lCnYcT1OoD');

type FormChecks = {
  [validator: string]: (input: string) => string | false | undefined;
};

const formChecks: FormChecks = {
  validateLength: val => (val === '' ? "Field can't be empty." : false),
  user_name: val => {
    const isValid = /^[a-z]+(\s{1}[a-z]+)*$/i.test(val);
    if (!isValid) return 'Not a valid name.';
  },
  user_email: val => {
    const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
    if (!isValid) return 'Please enter a valid email address.';
  },
  message: val => {
    return val.length < 20 && 'Minimum length: 20 characters.';
  },
};

const setInputErrorMessage = (inputName: string, errMsg: string) => {
  const errorEl = document.getElementById(`err-${inputName}--js`);
  if (errorEl) {
    errorEl.innerText = errMsg;
  }
};

let feedbackTimerId: null | number = null;

const setFormMessage = (text: string, clearTime?: number) => {
  const formFeedback = document.getElementById('form-feedback--js');

  if (!formFeedback) return;

  formFeedback.innerText = text;

  if (!clearTime) return;

  if (feedbackTimerId) clearTimeout(feedbackTimerId);

  feedbackTimerId = setTimeout(() => {
    formFeedback.innerText = '';
  }, clearTime * 1000);
};

const clearFormValues = () => {
  formInputs.forEach(el => {
    el.value = '';
  });
};

let failedAttempts = 0;

formEl.addEventListener('submit', async function (e) {
  e.preventDefault();
  formBtnEl.setAttribute('disabled', 'true');

  let formError = false;

  formInputs.forEach(el => {
    const input = el.value.trim();

    const lengthError = formChecks.validateLength(input);

    if (lengthError) {
      formError = true;
      setInputErrorMessage(el.name, lengthError);
      return;
    }

    const validationError = formChecks[el.name](el.value);

    if (validationError) {
      formError = true;
      setInputErrorMessage(el.name, validationError);
      return;
    }

    setInputErrorMessage(el.name, '');
  });

  if (formError) {
    setFormMessage('There was an issue with 1 or more fields.');
    formBtnEl.removeAttribute('disabled');
    return;
  }

  formBtnEl.innerText = 'Sending...';
  setFormMessage('');

  this.contact_number.value = (Math.random() * 100000) | 0;

  try {
    await emailjs.sendForm('contact_service', 'contact_form', this);

    setFormMessage('Sent!', 10);
    clearFormValues();
    failedAttempts = 0;
  } catch (err) {
    setFormMessage('An error occurred. Please try again later.', 12);
    failedAttempts++;

    if (failedAttempts >= 2) {
      clearFormValues();
      failedAttempts = 0;
    }
  } finally {
    formBtnEl.innerText = 'Submit';
    formBtnEl.removeAttribute('disabled');
  }
});

// actual: imports stable + stage 3
import 'core-js/stable';
import emailjs from '@emailjs/browser';
import icons from '../images/icons.svg';
import portfolio from '../images/portfolio-m.png';
import designo from '../images/designo-m.png';

const images = { designo, portfolio };

const headerEl = document.querySelector('.header');
const navbarEl = document.querySelector('.navbar');
const navBtnBoxEl = document.getElementById('navbar__btn-box--js');
const navUseEl = document.getElementById('navbar-icon--js');
const homeEl = document.querySelector('.section--home');
const arrowDownEl = document.getElementById('icon-arrow-down--js');
const overlayEl = document.querySelector('.overlay');

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

function scrollToX(x) {
  window.scrollTo({ top: x });
}

navbarEl.addEventListener('click', function (e) {
  e.preventDefault();
  const btn = e.target.closest('#navbar__btn--js');

  if (btn) return updateNav();

  const link = e.target.getAttribute('href');
  if (!link) return;

  updateNav('close');
  const targetEl = document.getElementById(link.slice(1));
  scrollToX(targetEl.offsetTop - navBtnBoxEl.getBoundingClientRect().height);
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

// LAZY LOAD IMAGES /////////////////////

const imgTargets = document.querySelectorAll('img[data-src]');

function loadImg(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const { target } = entry;

    target.src = images[target.dataset.src];
    target.addEventListener('load', () => {
      target.classList.remove('blur');
    });

    observer.unobserve(target);
  });
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  rootMargin: '50px',
  threshold: 0.1,
});

imgTargets.forEach(img => imgObserver.observe(img));

// FORM LOGIC /////////////////////

const formEl = document.getElementById('contact-form--js');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const messageEl = document.getElementById('message');
const formBtnEl = document.getElementById('form-btn--js');

emailjs.init('gSeSiP9lCnYcT1OoD');

const formChecks = {
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

const setInputFb = (inputName, errMsg) => {
  document.getElementById(`feedback-${inputName}--js`).innerText = errMsg;
};

let feedbackTimerId = null;

const setFormMsg = (text, clearTime) => {
  document.getElementById('form-err--js').innerText = text;

  if (!clearTime) return;

  if (feedbackTimerId) clearTimeout(feedbackTimerId);

  feedbackTimerId = setTimeout(() => {
    document.getElementById('form-err--js').innerText = '';
  }, clearTime * 1000);
};

const clearInputFb = () => {
  [nameEl, emailEl, messageEl].forEach(el => {
    document.getElementById(`feedback-${el.name}--js`).innerText = '';
  });
};

const clearFormValues = () => {
  [nameEl, emailEl, messageEl].forEach(el => {
    el.value = '';
  });
};

let failedAttempts = 0;

formEl.addEventListener('submit', function (e) {
  e.preventDefault();
  formBtnEl.setAttribute('disabled', 'true');

  let formErr = false;

  // Validate inputs
  [nameEl, emailEl, messageEl].forEach(el => {
    const input = el.value.trim();

    const lengthErr = formChecks.validateLength(input);

    if (lengthErr) {
      formErr = true;
      setInputFb(el.name, lengthErr);
      return;
    }

    const validationErr = formChecks[el.name](el.value);

    if (validationErr) {
      formErr = true;
      setInputFb(el.name, validationErr);
      return;
    }

    // Clear any existing err msg if input is valid
    setInputFb(el.name, '');
  });

  if (formErr) {
    setFormMsg('There was an issue with 1 or more fields.');
    formBtnEl.removeAttribute('disabled');
    return;
  }

  // Send form
  formBtnEl.innerText = 'Sending...';
  clearInputFb();

  this.contact_number.value = (Math.random() * 100000) | 0;

  emailjs
    .sendForm('contact_service', 'contact_form', this)
    .then(() => {
      setFormMsg('Sent!', 10);
      clearFormValues();
      failedAttempts = 0;
    })
    .catch(_ => {
      setFormMsg('An error occurred. Please try again later.', 12);

      if (failedAttempts >= 2) {
        clearFormValues();
        failedAttempts = 0;
      }
    })
    .finally(() => {
      formBtnEl.innerText = 'Submit';
      formBtnEl.removeAttribute('disabled');
    });
});

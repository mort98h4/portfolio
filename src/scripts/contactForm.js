import { emailApiUrl } from './main.js';
import * as validation from '../helpers/validation.js'; 


const contactForm = document.querySelector('form');
const inputs = contactForm.querySelectorAll('[name]');
const lang = contactForm.lang.value;

inputs.forEach(el => el.addEventListener('change', (event) => {
    const target = event.target;
    const hintElem = getErrorHint(target.name);
    hintElem.textContent = validation.getFrontendErrorMessage(target.name, target.validity, lang);
}));

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formErrorHint = getErrorHint('form');
    resetFormHint(formErrorHint);

    const formData = new FormData(contactForm);
    formData.delete('lang');

    if (!contactForm.checkValidity()) {
        formData.keys().forEach(key => {
            const hintElem = getErrorHint(key);
            hintElem.textContent = validation.getFrontendErrorMessage(key, contactForm[key].validity, lang);
        });
        return;
    }

    const response = await fetch(emailApiUrl, {
        method: 'POST',
        headers: {
            'x-api-key': import.meta.env.PUBLIC_EMAIL_API_KEY
        },
        body: formData,
    });
    const result = await response.json();

    if (result.inputError) {
        result.fields.forEach(field => {
            const hintElem = getErrorHint(field);
            hintElem.textContent = validation.getBackendErrorMessage(result.inputError.type, field, lang);
            hintElem.classList.add('input-invalid');
        });
        return;
    } else if (result.error) {
        formErrorHint.textContent = validation.getFormErrorMessage(lang);
        formErrorHint.classList.remove('hidden');
        return;
    }

    const formSuccessHint = document.querySelector('#form-success');
    formSuccessHint.textContent = validation.getFormSuccessMessage(lang);
    formSuccessHint.classList.remove('hidden');
    
    inputs.forEach((input) => input.value = '')
    contactForm.reset();

    setTimeout(() => {
        resetFormHint(formSuccessHint);
    }, 5000);
});

function getErrorHint(name) {
    return document.querySelector(`#${name}-error`);
}

function resetFormHint(target) {
    target.classList.add('hidden');
    target.textContent = '';
}
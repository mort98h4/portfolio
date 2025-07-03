import { actions, isInputError } from 'astro:actions';
import * as validation from '../helpers/validation.js'; 


const contactForm = document.querySelector('form');
const inputs = contactForm.querySelectorAll('[name]');

inputs.forEach(el => el.addEventListener('change', (event) => {
    const target = event.target;
    const hintElem = getErrorHint(target.name);
    hintElem.textContent = validation.getFrontendErrorMessage(target.name, target.validity)
}));

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.warn('Default prevented');

    const formErrorHint = getErrorHint('form');
    resetFormHint(formErrorHint);

    const formData = new FormData(contactForm);

    if (!contactForm.checkValidity()) {
        formData.keys().forEach(key => {
            const hintElem = getErrorHint(key);
            hintElem.textContent = validation.getFrontendErrorMessage(key, contactForm[key].validity);
        });
        return;
    }

    const { data, error } = await actions.sendMessage(formData);

    if (isInputError(error)) {
        console.log('data:', data);
        console.log('error:', error);

        let errorStr = String(error).substring(String(error).indexOf('['));
        const errorList = JSON.parse(errorStr);

        errorList.forEach(error => {
            const hintElem = getErrorHint(error.path[0]);
            hintElem.textContent = validation.getBackendErrorMessage(error);
            hintElem.classList.add('input-invalid');
        });
        return;
    } else if (error) {
        formErrorHint.textContent = validation.getFormErrorMessage();
        formErrorHint.classList.remove('hidden');
        return;
    };

    const formSuccessHint = document.querySelector('#form-success');
    formSuccessHint.textContent = validation.getFormSuccessMessage();
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
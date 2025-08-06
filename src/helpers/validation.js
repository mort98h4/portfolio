import { fullnameMax, fullnameMin, mainLang, messageMax, messageMin } from '../constants';
import { contact } from "../content/contact"

export function getFrontendErrorMessage(inputName, validityState, lang = mainLang) {
    try {            
        for(let key in validityState){
            if (validityState[key]) {

                switch(key) {
                    case 'valid':
                        return '';
                    case 'valueMissing':
                        return getValueMissingMessage(inputName, lang);
                    case 'tooShort':
                        return getMinLengthMessage(inputName, lang);
                    case 'tooLong':
                        return getMaxLengthMessage(inputName, lang);
                    case 'typeMismatch':
                        return getInvalidEmailMessage(lang);
                    case 'patternMismatch':
                        return getInvalidPhoneNumberMessage(lang);
                    default:
                        return getDefaultErrorMessage(lang);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export function getBackendErrorMessage(errorType, inputName, lang = mainLang) {
    try {
        switch(errorType) {
            case 'value_missing':
                return getValueMissingMessage(inputName, lang);
            case 'too_small':
                return getMinLengthMessage(inputName, lang);
            case 'too_big':
                return getMaxLengthMessage(inputName, lang);
            case 'invalid_email':
                return getInvalidEmailMessage(lang);
            case 'invalid_phone_number':
                return getInvalidPhoneNumberMessage(lang);
            default:
                return getDefaultErrorMessage(lang);
        }
    } catch (error) {
        console.error(error);
    }
}

function getErrorType(error) {
    if (error.code === 'invalid_type' && error.received === 'null') {
        return 'value_missing';
    }

    if (error.code === 'invalid_string' && error.validation === 'email') {
        return 'invalid_email';
    }

    if (error.code === 'invalid_string' && error.validation === 'regex') {
        return 'invalid_phone_number';
    }

    return error.code;
}

function getLabel(inputName, lang) {
    return contact[lang].form.fields[inputName].label ?? inputName;
}

function getMinLength(key) {
    switch (key) {
        case 'fullname':
            return fullnameMin;
        case 'message':
            return messageMin;
        default:
            console.warn(`'${key}' does not have a minimum length value.`);
            return 0;
    }
}

function getMaxLength(key) {
    switch (key) {
        case 'fullname':
            return fullnameMax;
        case 'message':
            return messageMax;
        default:
            console.warn(`'${key}' does not have a maximum length value.`);
            return 0;
    }
}

function getDefaultErrorMessage(lang) {
    switch(lang) {
        case 'da':
            return 'Der skete en fejl.';
        default:
            return 'An error occured.';
    }
}

function getValueMissingMessage(inputName, lang) {
    const label = getLabel(inputName, lang);

    switch(lang) {
        case 'da':
            return `'${label}' skal udfyldes.`;
        default:
            return `'${label}' is missing.`;
    }
} 

function getMinLengthMessage(inputName, lang) {
    const label = getLabel(inputName, lang);
    const minLen = getMinLength(inputName);

    switch(lang) {
        case 'da':
            return `'${label}' skal min. have ${minLen} karakterer.`;
        default:
            return `'${label}' should have min. ${minLen} characters.`;
    }
}

function getMaxLengthMessage(inputName, lang) {
    const label = getLabel(inputName, lang);
    const maxLen = getMaxLength(inputName);

    switch(lang) {
        case 'da':
            return `'${label}' skal max. have ${maxLen} karakterer.`;
        default:
            return `'${label}' should have max. ${maxLen} characters.`;
    }
}

function getInvalidEmailMessage(lang) {
    switch(lang) {
        case 'da':
            return 'Indtast en gyldig email adresse.';
        default: 
            return 'Please enter a valid email address.';
    }
}

function getInvalidPhoneNumberMessage(lang) {
    switch(lang) {
        case 'da':
            return 'Indtast et gyldigt dansk telefonnummer.';
        default:
            return 'Please enter a valid danish phone number.';
    }
}

export function getFormErrorMessage(lang = mainLang) {
    switch(lang) {
        case 'da':
            return 'Der skete en fejl - prøv igen.';
        default:
            return 'An error occured - please try again.';
    }
}

export function getFormSuccessMessage(lang = mainLang) {
    switch(lang) {
        case 'da':
            return 'Beskeden er blevet sendt!';
        default:
            return 'Message was successfully sent!';
    }
}
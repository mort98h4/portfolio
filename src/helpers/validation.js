import { fullnameMax, fullnameMin, messageMax, messageMin } from '../constants';

export function getFrontendErrorMessage(inputName, validityState) {
    try {            
        for(let key in validityState){
            if (validityState[key]) {

                switch(key) {
                    case 'valid':
                        return '';
                    case 'valueMissing':
                        return getValueMissingMessage(inputName);
                    case 'tooShort':
                        return getMinLengthMessage(inputName);
                    case 'tooLong':
                        return getMaxLengthMessage(inputName);
                    case 'typeMismatch':
                        return getInvalidEmailMessage();
                    case 'patternMismatch':
                        return getInvalidPhoneNumberMessage();
                    default:
                        return getDefaultErrorMessage();
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export function getBackendErrorMessage(error) {
    try {
        const errorType = getErrorType(error);
        const inputName = error.path[0];

        switch(errorType) {
            case 'value_missing':
                return getValueMissingMessage(inputName);
            case 'too_small':
                return getMinLengthMessage(inputName);
            case 'too_big':
                return getMaxLengthMessage(inputName);
            case 'invalid_email':
                return getInvalidEmailMessage();
            case 'invalid_phone_number':
                return getInvalidPhoneNumberMessage();
            default:
                return getDefaultErrorMessage();
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


function getMinLength(key) {
    switch (key) {
        case 'fullname':
            return fullnameMin;
        case 'message':
            return messageMin;
        default:
            console.warn(`'${key}' does not have a maximum length value.`);
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
            console.warn(`'${key}' does not have a minimum length value.`);
            return 0;
    }
}

function getDefaultErrorMessage() {
    return 'An error occured.';
}

function getValueMissingMessage(inputName) {
    return `'${inputName}' is missing.`;
} 

function getMinLengthMessage(inputName) {
    return `'${inputName}' should have min. ${getMinLength(inputName)} characters.`;
}

function getMaxLengthMessage(inputName) {
    return `'${inputName}' should have max. ${getMaxLength(inputName)} characters.`;
}

function getInvalidEmailMessage() {
    return 'Please enter a valid email address.';
}

function getInvalidPhoneNumberMessage() {
    return 'Please enter a valid danish phone number.';
}

export function getFormErrorMessage() {
    return 'An error occured - please try again.';
}

export function getFormSuccessMessage() {
    return 'Message was successfully sent!'
}
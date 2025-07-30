const isProd = import.meta.env.PROD;
export const emailApiUrl = isProd ? import.meta.env.PUBLIC_EMAIL_API_URL_PROD : import.meta.env.PUBLIC_EMAIL_API_URL_DEV;

document.addEventListener('DOMContentLoaded', () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        document.body.classList.add('safari');
    }
});

import * as colorMode from './colorMode.js';
import * as hero from './hero.js';
import * as navigation from './navigation.js';
import * as animations from './animations.js';
import * as carousel from './carousel.js';
import * as card from './card.js';
import * as modal from './modal.js';
import * as contactForm from './contactForm.js';
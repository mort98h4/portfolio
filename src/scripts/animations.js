console.log('Hello from animations.js')

'use strict';

const addAnimation = (entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            console.log(entry.target);
            entry.target.classList.add(entry.target.dataset.animation);
        }
    }
};

const observer = new IntersectionObserver(addAnimation, {threshold: 0});

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});
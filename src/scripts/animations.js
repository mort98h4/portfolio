'use strict';

const addAnimation = (entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
        }
    }
};

const observer = new IntersectionObserver(addAnimation, {threshold: 0});

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});
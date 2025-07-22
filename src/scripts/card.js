'use strict';

const addHoverClass = (entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add('hover');
        } else {
            entry.target.classList.remove('hover');
        }
    }
};

const observer = new IntersectionObserver(addHoverClass, {threshold: [.5]});

document.querySelectorAll('.card').forEach(el => {
    observer.observe(el);
});
'use strict';

document.querySelectorAll('.dropdown-toggle').forEach((toggle) => toggle.addEventListener('click', openDropdown));

function openDropdown(e) {
    console.log(e)
    const toggler = e.target;

    toggler.removeEventListener('click', openDropdown);
    toggler.setAttribute('aria-expanded', true)

    const dropdown = toggler.nextElementSibling;
    dropdown.classList.add('show');

    window.addEventListener('mousedown', closeDropdown);
}

function closeDropdown(e) {
    window.removeEventListener('mousedown', closeDropdown);

    const toggle = document.querySelector('.dropdown-toggle[aria-expanded="true"]');
    const dropdown = toggle.nextElementSibling;

    dropdown.querySelectorAll('a').forEach(el => {
        if (el === e.target && !el.classList.contains('active') && el.tagName === 'A') {
            return window.location = el.href;
        }
    });

    toggle.setAttribute('aria-expanded', false);
    dropdown.classList.remove('show');

    setTimeout(() => {
        toggle.addEventListener('click', openDropdown);
    }, 100);
}
window.addEventListener('load', getColorMode);
document.querySelector('#dark-mode-toggler').addEventListener('click', toggleDarkMode);

function getColorMode() {
    if (!window.matchMedia) {
        return;
    }

    const prefersColorMode = localStorage.getItem('prefersColorMode');
    let colorMode = prefersColorMode ? prefersColorMode : 'dark';
    toggleDarkMode(colorMode);

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    query.addEventListener('change', (event) => {
        colorMode = event.matches ? 'dark' : 'light';
        toggleDarkMode(colorMode);
    });
}

function toggleDarkMode(colorMode) {
    let target = colorMode.target;
    let mode = target ? target.dataset.colorMode : colorMode;

    if (target) {
        mode = target.dataset.colorMode;
    } else {
        mode = colorMode;
        target = document.querySelector('#dark-mode-toggler');
    }

    const htmlEl = document.querySelector('html');
    if (mode === 'dark') {
        htmlEl.classList.add('dark');
        target.dataset.colorMode = 'light';
    } else {
        htmlEl.classList.remove('dark');
        target.dataset.colorMode = 'dark';
    }

    localStorage.setItem('prefersColorMode', mode);
}
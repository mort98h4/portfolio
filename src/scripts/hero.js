const code = document.querySelector('.code .animate');
const text = code.textContent;
let num = 0;

code.textContent = '';
code.classList.remove('opacity-0');
nextLetter();

function nextLetter() {
    code.textContent = text.substring(0, num);
    num++;

    if (num <= text.length) {
        let randomTimer = Math.floor(Math.random() * 2 + 1);
        setTimeout(nextLetter, randomTimer * 100);
    } else {
        displayNeon();
    }
}

function displayNeon() {
    document.querySelector('#portfolio-mask').classList.add('on');
    document.querySelector('#mask-f').addEventListener('animationend', displayButtons);
}

function displayButtons() {
    document.querySelector('#hero .btn-container').classList.add('show');
}
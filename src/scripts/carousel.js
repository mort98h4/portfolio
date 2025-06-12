document.querySelectorAll('.carousel-list-btn').forEach(item => {
    item.addEventListener('click', listBtnClick);
});

document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', btnClick);
});

function listBtnClick() {
    const carousel = this.dataset.carousel;
    document.querySelectorAll(`${carousel} .carousel-list-btn`).forEach(item => {
        item.classList.remove('active');
    });
    this.classList.add('active');

    displaySlide(this.dataset.target, carousel);
}

function btnClick() {
    const target = this.dataset.target;
    const carousel = this.dataset.carousel;
    const newTarget = `${carousel}-slide-`;
    let prevTarget = newTarget;
    let nextTarget = newTarget;

    const direction = this.dataset.carouselDirection;
    const prevBtn = document.querySelector(`${carousel} button[data-carousel-direction="prev"]`);
    const nextBtn = document.querySelector(`${carousel} button[data-carousel-direction="next"]`);

    const activeIndex = parseInt(this.dataset.carouselActiveIndex);
    let nextIndex;
    const maxIndex = parseInt(this.dataset.carouselLength);
    const minIndex = 1;

    if (direction === 'next') {
        nextIndex = activeIndex + 1;
        prevTarget += activeIndex;       
        nextTarget += (nextIndex + 1);
    }

    if (direction === 'prev') {
        nextIndex = activeIndex - 1;
        prevTarget += (nextIndex - 1);
        nextTarget += activeIndex;
    }

    prevBtn.setAttribute('data-target', prevTarget);
    nextBtn.setAttribute('data-target', nextTarget);

    setDisabledState(prevBtn, nextIndex, minIndex);
    setDisabledState(nextBtn, nextIndex, maxIndex);

    prevBtn.setAttribute('data-carousel-active-index', nextIndex);
    nextBtn.setAttribute('data-carousel-active-index', nextIndex);

    displaySlide(target, carousel);
}

function setDisabledState(target, index, compareIndex) {
    if (index === compareIndex) {
        target.setAttribute('disabled', true);
    } else {
        target.removeAttribute('disabled');
    }
}

function displaySlide(targetElemId, carouselId) {
    document.querySelectorAll(`${carouselId} .experience-details`).forEach(item => item.setAttribute('aria-hidden', 'true'));
    const target = document.querySelector(targetElemId);
    target.scrollIntoView({block: 'nearest'});
    target.setAttribute('aria-hidden', false);
}
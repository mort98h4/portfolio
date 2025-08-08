'use strict';

let modalBtn = null;

document.querySelectorAll('.modal-btn').forEach(btn => btn.addEventListener('click', async (e) => {
    const element = document.querySelector(e.target.dataset.target);

    if (e.target.dataset.target === '#image-modal') {
        const project = await getProject(e.target.dataset.projectId);
        populateImageModal(project);
    }

    if (!element) {
        console.warn(`Target '${e.target.dataset.target}' was not found.`);
    } else {
        modalBtn = e.target;
        openModal(element);
    }
}))

document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', closeModal));

async function getProject(projectId) {
    const response = await fetch('/data/projects.json');

    if (!response.ok) {
        return undefined;
    }

    projectId = parseInt(projectId);
    const project = await response.json().then(projects => projects.find(x => x.id === projectId));

    return project;
}

function populateImageModal(project) {
    if (!project || !project.images) {
        console.log('No project images found.');
        return;
    }

    project.images.forEach(image => {
        if (image.fileName === '') {
            const index = project.images.indexOf(image);
            if (index > -1) {
                project.images.splice(index, 1);
            }
        }
    });

    const imgsLength = project.images.length;

    const imageModal = document.querySelector('#image-modal');

    imageModal.querySelector('#images-index').textContent = imgsLength > 0 ? '01' : '00';
    imageModal.querySelector('#images-total').textContent = imgsLength < 10 ? '0' + imgsLength : imgsLength;
    imageModal.querySelector('h4').textContent = project.title;

    if (imgsLength === 0) return;

    const activeImage = imageModal.querySelector('#active-image');
    const listImgTemp = document.querySelector('#list-img-temp');
    const imageList = imageModal.querySelector('#image-list');

    activeImage.src = project.imagePath + project.images[0].fileName;
    activeImage.alt = project.images[0].alt[activeImage.dataset.lang];
    activeImage.dataset.imageList = JSON.stringify(project.images);
    activeImage.dataset.activeImage = project.images[0].fileName;
    activeImage.dataset.imagePath = project.imagePath;
    activeImage.addEventListener('click', activeImageClicked);

    for (let i = 0; i < imgsLength; i++) {
        const clone = listImgTemp.content.cloneNode(true);
        const image = project.images[i];
        const img = clone.querySelector('img');

        img.src = project.imagePath + image.fileName;
        img.alt = image.alt[img.dataset.lang];
        img.dataset.imageIndex = i+1;
        clone.querySelector('.image-container').addEventListener('click', listImageClicked);
        if (i === 0) clone.querySelector('.image-container').classList.add('active');
        imageList.appendChild(clone);
    }
}

function activeImageClicked(event) {
    const modal = document.querySelector(event.target.dataset.target);
    const imgTemp = modal.querySelector('#fullscreen-img-temp');
    const dest = modal.querySelector('.fullscreen-container .image-container');
    dest.innerHTML = '';

    const imagePath = event.target.dataset.imagePath;
    const activeImage = event.target.dataset.activeImage;
    const images = JSON.parse(event.target.dataset.imageList);

    images.forEach(image => {
        const clone = imgTemp.content.cloneNode(true);
        const img = clone.querySelector('img');
        img.src = imagePath + image.fileName;
        img.alt = image.alt[img.dataset.lang];
        dest.appendChild(clone);
    });

    modal.querySelectorAll('.fullscreen-btn').forEach(btn => {
        btn.dataset.imageTotal = images.length;
        const activeImageIndex = images.findIndex(x => x.fileName === activeImage) + 1;
        btn.dataset.activeImageIndex = activeImageIndex;

        btn.removeAttribute('disabled');
        if (btn.classList.contains('left') && activeImageIndex === 1) btn.setAttribute('disabled', true);
        if (btn.classList.contains('right') && activeImageIndex === images.length) btn.setAttribute('disabled', true);
        btn.addEventListener('click', fullscreenBtnClicked);
    });

    const imgTarget = modal.querySelector(`img[src='${imagePath + activeImage}']`);

    openModal(modal);
    
    setTimeout(() => {
        imgTarget.scrollIntoView({behavior: 'instant', inline: 'center', });
    }, 50);
}

function fullscreenBtnClicked(event) {
    const btn = event.target;
    let activeImageIndex = parseInt(btn.dataset.activeImageIndex);
    const imageTotal = parseInt(btn.dataset.imageTotal);
    
    const dir = btn.classList.contains('left') ? 'left' : 'right';

    if (dir === 'left' && activeImageIndex > 1) activeImageIndex = --activeImageIndex;
    if (dir === 'right' && activeImageIndex < imageTotal) activeImageIndex = ++activeImageIndex;

    document.querySelectorAll('.modal.show .fullscreen-btn').forEach(btn => {
        btn.dataset.activeImageIndex = activeImageIndex;
        btn.removeAttribute('disabled');
    });

    if (activeImageIndex === 1 || activeImageIndex === imageTotal) {
        btn.setAttribute('disabled', true);
    }
    
    const images = document.querySelectorAll('.modal.show .fullscreen-img');
    for (let i = 0; i < images.length; i++) {
        if (i + 1 === activeImageIndex) {
            images[i].scrollIntoView({inline: 'center'});
        }
    }
}

function listImageClicked(event) {
    const target = event.target;
    
    const image = target.querySelector('img');
    const imageIndex = image.dataset.imageIndex;
    document.querySelector('#images-index').textContent = imageIndex < 10 ? '0' + imageIndex : imageIndex;
    
    if (window.innerWidth < 768) {
        target.scrollIntoView({inline: 'center'});
    }
    
    document.querySelectorAll('.image-container').forEach(elem => elem.classList.remove('active'));
    target.classList.add('active');

    document.querySelector('#active-image').src = image.src;
    document.querySelector('#active-image').alt = image.alt;
    document.querySelector('#active-image').dataset.activeImage = image.src.substring(image.src.lastIndexOf('/') + 1);
}

function openModal(element) {
    element.setAttribute('aria-hidden', 'false');
    element.classList.add('show');
    document.querySelector('body').style.overflow = 'hidden';
    element.addEventListener('keydown', modalKeyPress);
    element.focus();
}

function modalKeyPress(event) {
    const key = event.key.toLowerCase();
    if (key === 'escape') {
        closeModal(event);
    }
}

function closeModal(event) {
    let element = null;

    if (event.target.getAttribute('aria-modal')) {
        element = event.target;
    } else if (event.target.dataset.dismiss === 'active modal') {
        element = document.querySelector(event.target.dataset.dismissTarget);
    }
    
    if (element !== null) {
        modalBtn.focus();
        element.setAttribute('aria-hidden', 'true');
        element.classList.remove('show');
        document.querySelector('body').style.overflow = document.querySelector('.modal.show') ? 'hidden' : '';
        element.removeEventListener('keydown', modalKeyPress);

        try {
            document.querySelector('.modal.show').focus();
        } catch {
            // Do nothing...
        }
    } else {
        return;
    }

    if (element.getAttribute('id') === 'image-modal') {
        element.querySelector('#images-index').textContent = '';
        element.querySelector('#images-total').textContent = '';
        element.querySelector('#image-list').innerHTML = '';
        element.querySelector('#active-image').src = '';
        element.querySelector('#active-image').alt = '';
        element.querySelector('#active-image').dataset.imageList = '';
        element.querySelector('#active-image').dataset.activeImage = '';
        element.querySelector('#active-image').dataset.imagePath = '';
    }
}
window.addEventListener('scroll', windowScroll);

function windowScroll() {
    const scrollY = window.scrollY;
    const nav = document.querySelector('nav');
    const headerHeight = document.querySelector('#hero').getBoundingClientRect().height;

    if (scrollY > headerHeight/2) {
        nav.classList.add('show');
    } else {
        nav.classList.remove('show');
    }
}

const navigationToggler = document.querySelector('#navigation-toggler');
navigationToggler.addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-link').forEach(el => {
    el.addEventListener('click', () => navigationToggler.click());
});

function toggleMenu() {
    const navContent = document.querySelector(this.dataset.target);
    const navList = navContent.querySelector('.navigation-list');
    
    const childrenTotal = navList.childElementCount;
    let navListChildrenHeight = 0;
    navList.querySelectorAll('li').forEach((child) => {
        const childHeight = child.getBoundingClientRect().height;
        if (childHeight > navListChildrenHeight) {
            navListChildrenHeight = childHeight;
        } 
    })

    const navListHeight = (navListChildrenHeight * childrenTotal) + navList.getBoundingClientRect().height;

    navContent.setAttribute('style', `--navigation-list-height: ${navListHeight}px;`);

    const ariaExpanded = this.getAttribute('aria-expanded');
    if (ariaExpanded === 'false') {
        this.setAttribute('aria-expanded', 'true');
    } else {
        this.setAttribute('aria-expanded', 'false');
    }
    
    navContent.classList.toggle('show');
}

const toggleActiveNavLink = (entries) => {
    for (const entry of entries) {
        const navLinks = document.querySelectorAll('.nav-link');
        const targetId = entry.target.getAttribute('id');
            
        if (entry.isIntersecting) {                
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
        } else {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.remove('active');
                }
            });
        }
    }
};

const observer = new IntersectionObserver(toggleActiveNavLink, {threshold: 0.5});

document.querySelectorAll('section').forEach(el => {
    observer.observe(el);
});
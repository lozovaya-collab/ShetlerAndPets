//бургер
const burger = document.querySelector('.burger'),
    logo = document.querySelector('.logo'),
    sidebar = document.querySelector('.sidebar'),
    shadowed = document.querySelector('.shadowed'),
    link = document.querySelector('.link__burger');

let navOpen = false;

function hideBurger() {
    logo.style.opacity = '1';
    shadowed.style.display = 'none';
    burger.classList.remove('burger_rotate');
    sidebar.classList.remove('sidebar_active');
    document.body.classList.remove('scroll_not');
}

burger.addEventListener('click', () => {
    navOpen = !navOpen;
    if (navOpen) {
        logo.style.opacity = '0';
        shadowed.style.display = 'block';
        burger.classList.add('burger_rotate');
        sidebar.classList.add('sidebar_active');
        document.body.classList.add('scroll_not');
    } else {
        hideBurger()
    }
});

shadowed.addEventListener('click', () => {
    hideBurger()
});

link.addEventListener('click', () => {
    hideBurger()
});

const linksHeader = document.querySelectorAll('.list__link')

for (let i = 0; i < linksHeader.length; i++) {
    if (linksHeader[i].href === '') {
        linksHeader[i].className = 'disabled'
    }
}
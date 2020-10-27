let pets = []
let fullPetsList = []
const request = new XMLHttpRequest();
const pets_box = document.querySelector('.pets__images')
const pets_cards = pets_box.children
let positionNext = 0;
let positionPrev = 0;
let pn_1, pn_2

const prevButton = document.querySelector('.pets__content-section-btnLeft')
const nextButton = document.querySelector('.pets__content-section-btnRight')

request.open('GET', './pets.json')



fetch('./pets.json').then(res => res.json()).then(list => {
    pets = list;
    fullPetsList = (() => {
        let tempArr = [];

        for (let i = 0; i < 6; i++) {
            const newPets = pets;

            for (let j = pets.length; j > 0; j--) {
                let randInd = Math.floor(Math.random() * j);
                const randElem = newPets.splice(randInd, 1)[0];
                newPets.push(randElem);
            }

            tempArr = [...tempArr, ...newPets];
        }
        return tempArr;
    })();

    fullPetsList = sort863(fullPetsList);

    createPets(fullPetsList);

    for (let i = 0; i < (fullPetsList.length / 6); i++) {
        const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            stepList.forEach((item, ind) => {
                if (item.name === stepList[j].name && (ind !== j)) {
                    pets_box.children[(i * 6) + j].style.border = '5px solid red';
                }
            })
        }
    }
})

const createPets = (petsList) => {

    pets_box.innerHTML = createCards(petsList)
}

const createCards = (petsList) => {
    let str = ''
    for (let i = 0; i < petsList.length; i++) {

        str += `<div class="pets__images-card"><img alt="${petsList[i].name}" src="${petsList[i].img}"><span>${petsList[i].name}</span><button type="button" class="pets__images-card-button">Learn more</button></div>`
    }

    return str
}

const sort863 = (list) => {
    let unique8List = [];
    let length = list.length;
    for (let i = 0; i < length / 8; i++) {
        const uniqueStepList = [];
        for (j = 0; j < list.length; j++) {
            if (uniqueStepList.length >= 8) {
                break;
            }
            const isUnique = !uniqueStepList.some((item) => {
                return item.name === list[j].name;
            });
            if (isUnique) {
                uniqueStepList.push(list[j]);
                list.splice(j, 1);
                j--;
            }
        }
        unique8List = [...unique8List, ...uniqueStepList];
    }
    list = unique8List;


    list = sort6recursively(list);

    return list;
}

const sort6recursively = (list) => {
    const length = list.length;

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });

            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j;
                const which8OfList = Math.trunc(ind / 8);

                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

                sort6recursively(list);
            }
        }
    }

    return list;
}
request.send()


if (pets_box.clientWidth > 980) {
    pn_1 = 1083
    pn_2 = -16245
} else if (pets_box.clientWidth < 600 && pets_box.clientWidth > 500) {
    pn_1 = 620
    pn_2 = -13640
} else {
    pn_1 = 270
    pn_2 = -6210
}
prevButton.addEventListener('click', (e) => {



    if (positionNext === pn_1 && itr === 1) {
        for (let i = 0; i < fullPetsList.length; i++) {
            pets_cards[i].style.transition = `transform 1s ease-in-out`;
        }
        positionNext = pn_2
        itr = 0
    }
    positionPrev = positionNext + pn_1
    positionNext = positionPrev

    if (positionPrev === pn_1 && itr === 0) {
        positionPrev = positionNext = pn_2
    }
    for (let i = 0; i < fullPetsList.length; i++) {
        if (positionNext === pn_2) {
            pets_cards[i].style.transition = `none`;
        } else if (positionNext > pn_2) {
            pets_cards[i].style.transition = `transform 1s ease-in-out`;
        }
        pets_cards[i].style.display = 'flex'
        pets_box.children[i].style.transform = `translate(${positionPrev}px)`;
    }
    if (positionPrev === 0) {
        for (let i = 0; i < fullPetsList.length; i++) {
            pets_cards[i].style.transition = `none`;
        }
        positionNext = pn_2 - pn_1
        itr = 1
    }
});



let itr = 0

nextButton.addEventListener('click', (e) => {

    positionNext = positionNext - pn_1

    for (let i = 0; i < fullPetsList.length; i++) {
        if (positionNext < 0) {
            pets_cards[i].style.transition = `transform 1s ease-in-out`;
        }
        pets_cards[i].style.transform = `translate(${positionNext}px)`;
        itr += 1
    }
    if (positionNext < (pn_2 + 45)) {

        for (let i = 0; i < fullPetsList.length; i++) {
            pets_cards[i].style.transition = `none`;
        }
        positionNext = pn_1
        itr = 1
    }


});


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
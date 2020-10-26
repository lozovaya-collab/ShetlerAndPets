let pets = []
let fullPetsList = []
const request = new XMLHttpRequest();
const pets_box = document.querySelector('.pets__images')
const pets_cards = pets_box.children



request.open('GET', './pets.json')


request.onload = () => { console.log(request.response) };
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
let positionNext = 0;
let positionPrev = 0;

document.querySelector('.pets__content-section-btnLeft').addEventListener('click', (e) => {
    console.log('prev');
    if (positionNext === 1083 && itr === 1) {
        for (let i = 0; i < fullPetsList.length; i++) {
            pets_cards[i].style.transition = `transform 1s ease-in-out`;
        }
        positionNext = -16245
        itr = 0
    }
    positionPrev = positionNext + 1083
    positionNext = positionPrev
    console.log(positionPrev);
    if (positionPrev === 1083 && itr === 0) {
        positionPrev = positionNext = -16245
    }
    for (let i = 0; i < fullPetsList.length; i++) {
        if (positionNext === -16245) {
            pets_cards[i].style.transition = `none`;
        } else if (positionNext > -16245) {
            pets_cards[i].style.transition = `transform 1s ease-in-out`;
        }
        pets_box.children[i].style.transform = `translate(${positionPrev}px)`;
    }
    if (positionPrev === 0) {
        for (let i = 0; i < fullPetsList.length; i++) {
            pets_cards[i].style.transition = `none`;
        }
        positionNext = -16245 - 1083
        itr = 1
    }

});



let itr = 0

document.querySelector('.pets__content-section-btnRight').addEventListener('click', (e) => {
    console.log('next');

    positionNext = positionNext - 1083
    console.log(positionNext);

    for (let i = 0; i < fullPetsList.length; i++) {
        if (positionNext < 0) {
            pets_cards[i].style.transition = `transform 1s ease-in-out`;
        }
        pets_cards[i].style.transform = `translate(${positionNext}px)`;
        itr += 1
    }
    if (positionNext < -16200) {

        for (let i = 0; i < fullPetsList.length; i++) {
            pets_cards[i].style.transition = `none`;
        }
        positionNext = 1083
        itr = 1
    }


});


function moveSlides(index) {
    if (index === fullPetsList.length - 1) {
        index = 0
    }

    pets_box.children[index].transform = `translate(${positionNext - 2 * 1083}px)`

    pets_box.children[index + 1].transform = `translate(${positionNext - 2 * 1083}px)`

    pets_box.children[index + 2].transform = `translate(${positionNext - 2 * 1083}px)`



}


(fullPetsList / itemsPerPage)
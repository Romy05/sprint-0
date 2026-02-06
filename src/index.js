import { getRomyData } from './service/romyService.js';
import { getPokemonData } from './service/pokemonService.js';

const buttons = document.querySelectorAll("button.card");

buttons.forEach(button => {
    button.addEventListener('click', toggleOpen);
})

function toggleOpen(event) {
    event.target.classList.toggle('open');
}

// Haal data over mij op uit de api
export const romyData = await getRomyData();

const cardBacks = document.querySelectorAll('.card-back')
const initialCardBackMedia = Array.from(cardBacks).map(cardBack => {
    return cardBack.firstElementChild;
});
console.log(initialCardBackMedia);

// Voeg de opgehaalde data toe aan de html
const nickNameField = document.getElementById('nickname');
nickNameField.textContent = romyData.nickName;

const nameField = document.getElementById('name');
nameField.textContent = romyData.name;

const ageField = document.getElementById('age');
ageField.textContent = romyData.age;

const cityField = document.getElementById('city');
cityField.textContent = romyData.city;

const githubField = document.getElementById('github');
githubField.textContent = romyData.userName;

const pokemonField = document.getElementById('pokemon');
pokemonField.textContent = romyData.pokemon;

const emojiField = document.getElementById('emoji');
emojiField.textContent = romyData.emoji;

const pokemonCheckbox = document.getElementById('pokemon-theme')

pokemonCheckbox.addEventListener('click', togglePokemonCards)

// Als pokemon mode aanstaat, vervang de elementen
function togglePokemonCards(event) {
    if (event.target.checked === true) {
        cardBacks.forEach(async (cardBack) => {
            const pokemonData = await getPokemonData();
            const currentMedia = cardBack.firstElementChild;
            const newImage = document.createElement('img')
            newImage.alt = pokemonData.name;
            newImage.src = pokemonData.imageUrl;

            cardBack.replaceChild(newImage, currentMedia);
        })
    } else {
        cardBacks.forEach((cardBack, index) => {
            const originalMedia = initialCardBackMedia[index];
            cardBack.innerHTML = '';

            cardBack.appendChild(originalMedia);
        });
    }   
}

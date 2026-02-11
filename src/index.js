import { getValidCourseStudents, getRomyData } from './service/studentService.js';
import { getRandomPokemon } from './service/pokemonService.js';
import { distributeCards, initMemory } from './helper/memoryGame.js';
import { playCardFlipAudio } from './helper/audio.js';

loadData()

const cardBacks = document.querySelectorAll('.card-back');
const motherDuck = document.querySelector('.mother-duck');
const ducklings = document.querySelectorAll('.duckling');

const initialCardBackMedia = Array.from(cardBacks).map(cardBack => {
    return cardBack.firstElementChild;
});

async function loadData() {
    await loadRomyData();
    await loadMemory();
    initButtons();
}

async function loadRomyData() {
    // Haal data over mij op uit de api
    const romyData = await getRomyData();

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
}

async function loadMemory(isStudents = true) {
    let possibleCards;
    if (isStudents) {
        // Haal alle minor studenten uit de api 
        possibleCards = await getValidCourseStudents();
    } else {
        possibleCards = await getRandomPokemon(6);
        console.log(possibleCards);
    }

    const shuffledCards = distributeCards(possibleCards);
    initMemory(shuffledCards);
}

function initButtons() {
    const pokemonCheckbox = document.getElementById('pokemon-theme');
    pokemonCheckbox.addEventListener('click', togglePokemonCards);

    const cardButtons = document.querySelectorAll("button.card");
    cardButtons.forEach(button => {
        button.addEventListener('click', toggleOpen);
    });

    const resetButton = document.querySelector("button.reset-button");
    resetButton.addEventListener('click', () => {
        const cards = distributeCards(students);
        initMemory(cards);
    });
}

function toggleOpen(event) {
    event.target.classList.toggle('open');
    playCardFlipAudio();
}

// Als pokemon mode aanstaat, vervang de elementen
async function togglePokemonCards(event) {
    const isPokemon = event.target.checked;
    if (isPokemon) {
        const pokemons = await getRandomPokemon(cardBacks.length);
        cardBacks.forEach((cardBack, index) => {
            replaceWithPokemonImage(cardBack, pokemons[index]);
        })
    } else {
        cardBacks.forEach((cardBack, index) => {
            const originalMedia = initialCardBackMedia[index];
            cardBack.innerHTML = '';
            cardBack.appendChild(originalMedia);
        });
    }   
    toggleSwimmingPokemon(isPokemon);
    loadMemory(!isPokemon);
}

async function replaceWithPokemonImage(cardBack, pokemon) {
    const currentMedia = cardBack.firstElementChild;
    const newImage = document.createElement('img')
    newImage.alt = pokemon.name;
    newImage.src = pokemon.imageUrl;

    cardBack.replaceChild(newImage, currentMedia);
}

function toggleSwimmingPokemon(isPokemon) {
    if (isPokemon) {
        motherDuck.src = 'public/images/gyarados.png';
        ducklings.forEach(duck => {
            duck.src = 'public/images/magikarp.png';
        })
    } else {
        motherDuck.src = 'public/images/duck.png';
        ducklings.forEach(duck => {
            console.log(duck);
            duck.src = 'public/images/duck.png';
        })
    }
}
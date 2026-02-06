import { getRomyData } from './service/romyService.js';

const buttons = document.querySelectorAll("button.card");

buttons.forEach(button => {
    button.addEventListener('click', toggleOpen);
})

function toggleOpen(event) {
    event.target.classList.toggle('open');
}

export const romyData = await getRomyData();

console.log(romyData);

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
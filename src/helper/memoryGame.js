import { playCardFlipAudio } from '../helper/audio.js';
import { makeItRain } from '../helper/confetti.js';

const amountOfMatches = 6; // Dit getal zou nog kunnen veranderen via een instelling in de toekomst misschien.
let score = 0;

// Shuffle de kaarten en scheidt de foto van de naam
export function distributeCards(cards) {
    let memoryCards = [];

    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    const chosenCards =  shuffledCards.slice(0, amountOfMatches);

    chosenCards.forEach((card, index) => {
        const imageCard = {
            type: 'image',
            pairIndex: index,
            imageUrl: card.imageUrl,
        }

        const textCard = {
            type: 'text',
            pairIndex: index,
            name: card.name,
            nickName: card.nickName,
            emoji: card.emoji,
        }

        memoryCards = [
            imageCard,
            textCard,
            ...memoryCards
        ];
    })

    return [...memoryCards].sort(() => Math.random() - 0.5);
}

// Render het speelveld
export function initMemory(memoryCardData) {
    score = 0;
    updateScore(score);
    const memoryContainer = document.querySelector('.memory-field');
    memoryContainer.innerHTML = "";

    memoryCardData.forEach(cardData => {
        const card = generateCard(cardData);
        memoryContainer.appendChild(card);
    });
}

function generateCard(cardData) {
    const button = document.createElement('button');
    button.addEventListener('click', handleOpenCard);
    button.classList.add('memory-card');
    button._pairIndex = cardData.pairIndex;
    button.dataset.guessed = false;

    const innerCard = document.createElement('div');
    innerCard.classList.add('memory-card-inner');

    const back = document.createElement('div');
    back.classList.add('memory-card-back');

    back.innerHTML = `
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
    <svg class="question-svg" width="800px" height="800px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000" stroke="#000000">

    <g id="SVGRepo_bgCarrier" stroke-width="0"/>

    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

    <g id="SVGRepo_iconCarrier">

    <path fill="currentColor" d="M17 27a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3c.603-.006 6-1 6-5c0-2-2-4-5-4c-2.441 0-4 2-4 3a3 3 0 1 1-6 0c0-4.878 4.58-9 10-9c8 0 11 5.982 11 11c0 4.145-2.277 7.313-6.413 8.92c-.9.351-1.79.587-2.587.747V24a3 3 0 0 1-3 3z"/>

    <circle fill="currentColor" cx="17" cy="32" r="3"/>

    </g>

    </svg>`;

    innerCard.appendChild(back);

    const front = document.createElement('div');
    front.classList.add('memory-card-front');

    if (cardData.type == 'text') {
        const name = document.createElement('p');
        name.textContent = cardData.name;

        front.appendChild(name);

        const emoji = cardData.emoji ? ` (${cardData.emoji})` : '';

        const extraInfo = document.createElement('p');
        if (cardData.nickName && cardData.nickName.length <= 11){
            extraInfo.textContent = `${cardData.nickName}${emoji}`;
        } else if (cardData.emoji) {
            extraInfo.textContent = emoji;
        } 
        extraInfo.classList.add('memory-card-extra');
        front.appendChild(extraInfo);
    } else {
        const image = document.createElement('img');
        image.src = cardData.imageUrl;
        image.onerror = function() {
            this.onerror = null; 
            this.src = 'public/images/decidueye.png';
        };
        front.appendChild(image);
    }
    
    innerCard.appendChild(front);
    button.appendChild(innerCard);

    return button;
}

export function handleOpenCard(event) {
    playCardFlipAudio();
    const cardToCompare = document.querySelector('.memory-card.open[data-guessed="false"]');
    event.target.classList.add('open');
    event.target.removeEventListener('click', handleOpenCard);

    if(!cardToCompare) {
        return;
    }

    toggleCardsListener(false);
    setTimeout(() => {
        if (compareCards(event.target, cardToCompare)) {
            cardToCompare.dataset.guessed = true;
            event.target.dataset.guessed = true;
            score++;
            updateScore();
        } else {
            cardToCompare.classList.remove('open');
            event.target.classList.remove('open');
            playCardFlipAudio();
        }
        
        toggleCardsListener(true);
    }, 1500)
}

function toggleCardsListener(add) {
    const cards = document.querySelectorAll('.memory-card[data-guessed="false"]');

    if (add) {
        cards.forEach(card => {
            card.addEventListener('click', handleOpenCard);
        })
    } else {
        cards.forEach(card => {
            card.removeEventListener('click', handleOpenCard);
        })
    }
}

function compareCards(card, cardToCompare) {
    return card._pairIndex == cardToCompare._pairIndex;
}

function updateScore(givenScore) {
    const validScore = givenScore ?? score
    const scoreBoard = document.querySelector('.score');
    scoreBoard.textContent = `Score: ${givenScore ?? score}`;

    if (validScore == amountOfMatches) {
        makeItRain();
    }
}
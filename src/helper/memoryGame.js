export function distributeCards(students) {
    const amountOfMatches = 6; // Dit getal zou nog kunnen veranderen via een instelling in de toekomst misschien.
    let memoryCards = []

    const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
    const chosenStudents =  shuffledStudents.slice(0, amountOfMatches);

    chosenStudents.forEach((student, index) => {
        const imageCard = {
            type: 'image',
            pairIndex: index,
            imageUrl: student.avatarUrl,
        }

        const textCard = {
            type: 'text',
            pairIndex: index,
            name: student.name,
            nickName: student.nickName,
            emoji: student.emoji,
        }

        memoryCards = [
            imageCard,
            textCard,
            ...memoryCards
        ];
    })

    return [...memoryCards].sort(() => Math.random() - 0.5);
}

export function initMemory(memoryCardData) {
    const memoryContainer = document.querySelector('.memory-field');
    console.log(memoryContainer);
    memoryContainer.innerHTML = "";

    memoryCardData.forEach(cardData => {
        const card = generateCard(cardData);
        memoryContainer.appendChild(card);
    })
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

    const backImg = document.createElement('img')
    backImg.alt = 'Vraagteken';
    backImg.src = 'public/images/question-mark.png';

    back.appendChild(backImg);
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
            extraInfo.textContent = `Bijnaam: ${cardData.nickName}${emoji}`;
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
    const cardToCompare = document.querySelector('.memory-card.open[data-guessed="false"]');
    event.target.classList.add('open');

    if(!cardToCompare) {
        return;
    }

    toggleCardsListener(false);
    setTimeout(() => {
        if (compareCards(event.target, cardToCompare)) {
            cardToCompare.dataset.guessed = true;
            event.target.dataset.guessed = true;
        } else {
            cardToCompare.classList.remove('open');
            event.target.classList.remove('open');
        }
        
        toggleCardsListener(true);
    }, 1500)
}

function toggleCardsListener(add) {
    const cards = document.querySelectorAll('.memory-card[data-guessed="false"]');

    if (add) {
        console.log('add to cards', cards)
        cards.forEach(card => {
            card.addEventListener('click', handleOpenCard);
        })
    } else {
        console.log('remove from cards', cards)
        cards.forEach(card => {
            card.removeEventListener('click', handleOpenCard);
        })
    }

}

function compareCards(card, cardToCompare) {
    return card._pairIndex == cardToCompare._pairIndex;
}
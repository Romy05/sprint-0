export function playCardFlipAudio() {
    playAudio('card-flip');
}

export function playKidsCheeringAudio() {
    playAudio('kids-cheering');
}

function playAudio(id) {
    const audio = document.getElementById(id);
    audio.currentTime = 0;
    audio.play().catch(err => console.log(err));
}
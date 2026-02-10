export function playCardFlipAudio() {
    const audio = document.getElementById('card-flip');
    audio.currentTime = 0;
    audio.play().catch(err => console.log(err));
}
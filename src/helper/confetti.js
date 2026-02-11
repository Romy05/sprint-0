/*BRON: https://codepen.io/Ranjithkumar10/pen/mdqeoVp*/

import { playKidsCheeringAudio } from "./audio.js";

export function makeItRain() {
    var end = Date.now() + (2 * 1000);

    const colors = [
    '#ff0000',
    '#ff9900',
    '#ffff00',
    '#33cc33',
    '#3399ff',
    '#6633cc',
    '#cc33cc'
    ];

    const shapes = [
        'circle',
        'square',
        'star'
    ]

    function spreadConfetti() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors,
            shapes
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors,
            shapes
        });

        if (Date.now() < end) {
            requestAnimationFrame(spreadConfetti);
        }
    };
    spreadConfetti();
    playKidsCheeringAudio();
}
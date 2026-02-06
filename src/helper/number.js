export function getRandomNumber(max = null) {
    if (max === null) {
        return Math.random();
    } else {
        return Math.floor(Math.random() * max);
    }
}
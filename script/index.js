const buttons = document.querySelectorAll("button.card");

buttons.forEach(button => {
    button.addEventListener('click', toggleOpen);
})

function toggleOpen(event) {
    event.target.classList.toggle('open');
}
const cardBacks = document.querySelectorAll('.card__back img');
const cards = document.querySelectorAll('.card');

let fruitsArray = [
  'apple.png',
  'apple.png',
  'banana.png',
  'banana.png',
  'kiwi.png',
  'kiwi.png',
  'peach.png',
  'peach.png',
  'pear.png',
  'pear.png',
  'pineapple.png',
  'pineapple.png',
  'strawberry.png',
  'strawberry.png',
  'watermelon.png',
  'watermelon.png',
];
let fruitsArrayCopy = fruitsArray.map((x) => x);

let moves = 0,
  time = 0;

const movesField = document.querySelector('.moves'),
  timeField = document.querySelector('.time');

function randomCard() {
  const randomIndex = Math.floor(Math.random() * fruitsArray.length);
  const fruit = fruitsArray.splice(randomIndex, 1);
  return fruit;
}
function startTime() {
  setInterval(() => {
    time++;
    timeField.textContent = `Time: ${time} sec`;
  }, 1000);
}

function initGame() {
  cardBacks.forEach((card) => {
    card.src = `./images/${randomCard()}`;
  });
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      moves++;
      movesField.textContent = `${moves} moves`;
      card.classList.toggle('flipped');
      if (time === 0) startTime();
    });
  });
}
initGame();

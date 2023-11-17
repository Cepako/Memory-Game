const cardBacks = document.querySelectorAll('.card__back img');
const cards = document.querySelectorAll('.card');
const winnerText = document.querySelector('.popup h1'),
  popup = document.querySelector('.popup'),
  gamePanel = document.querySelector('.game-panel'),
  restartButton = document.querySelector('.restart');

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
  time = 0,
  cardFlipped = 0;

const movesField = document.querySelector('.moves'),
  timeField = document.querySelector('.time');

function randomCard() {
  const randomIndex = Math.floor(Math.random() * fruitsArray.length);
  const fruit = fruitsArray.splice(randomIndex, 1);
  return fruit;
}
let intervalId;
function startTime() {
  intervalId = setInterval(() => {
    timeField.textContent = `Time: ${time} sec`;
    time++;
  }, 1000);
}
function stopTime() {
  clearInterval(intervalId);
}

let firstFlipped,
  secondFlipped,
  stopCounter = 0;

function gameFunc(card) {
  if (cardFlipped === 0) {
    card.classList.add('flipped');
    cardFlipped++;
    firstFlipped = card;
    firstFlipped.style.pointerEvents = 'none';
    if (time === 0) {
      ++time;
      startTime();
    }
  } else if (cardFlipped === 1) {
    card.classList.add('flipped');
    cardFlipped++;
    secondFlipped = card;
    if (
      firstFlipped.children[1].children[0].src ===
      secondFlipped.children[1].children[0].src
    ) {
      firstFlipped.style.pointerEvents = 'none';
      secondFlipped.style.pointerEvents = 'none';
      stopCounter++;
    } else {
      secondFlipped.style.pointerEvents = 'none';
      setTimeout(() => {
        firstFlipped.classList.remove('flipped');
        firstFlipped.style.pointerEvents = 'auto';
        secondFlipped.classList.remove('flipped');
        secondFlipped.style.pointerEvents = 'auto';
      }, 600);
    }
    cardFlipped = 0;
  }
  moves++;
  movesField.textContent = `${moves} moves`;

  if (stopCounter === cards.length / 2) {
    stopTime();
    winnerText.textContent = `Great job you did it in ${moves} moves and ${time} seconds!👏🏆`;
    popup.classList.add('activePopup');
    gamePanel.classList.add('activeBlur');
    restartButton.classList.add('active');
  }
}
function randomCards() {
  cardBacks.forEach((card) => {
    card.src = `./images/${randomCard()}`;
  });
}
function initGame() {
  randomCards();
  cards.forEach((card) => {
    card.addEventListener('click', () => gameFunc(card));
  });
}

initGame();

const xBtn = document.querySelector('.fa-xmark');
xBtn.addEventListener('click', () => {
  popup.classList.remove('activePopup');
  gamePanel.classList.remove('activeBlur');
});

restartButton.addEventListener('click', () => {
  restartButton.classList.remove('active');
  moves = 0;
  time = 0;
  cardFlipped = 0;
  stopCounter = 0;
  firstFlipped = null;
  secondFlipped = null;
  movesField.textContent = `${moves} moves`;
  timeField.textContent = `Time: ${time} sec`;
  cards.forEach((card) => {
    card.classList.remove('flipped');
    card.style.pointerEvents = 'auto';
  });
  fruitsArray = fruitsArrayCopy.map((x) => x);
  randomCards();
});

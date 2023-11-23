const cardBacks = document.querySelectorAll('.card__back img'),
  cards = document.querySelectorAll('.card'),
  winnerText = document.querySelector('.popup h1'),
  popup = document.querySelector('.popup'),
  gamePanel = document.querySelector('.game-panel'),
  restartButton = document.querySelector('.restart'),
  xBtn = document.querySelector('.fa-xmark'),
  movesField = document.querySelector('.moves'),
  timeField = document.querySelector('.time');

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
  cardFlipped = 0,
  intervalId,
  firstFlipped,
  secondFlipped,
  stopCounter = 0,
  fixFlag = true;

function randomCard() {
  const randomIndex = Math.floor(Math.random() * fruitsArray.length);
  const fruit = fruitsArray.splice(randomIndex, 1);
  return fruit;
}

function startTime() {
  intervalId = setInterval(() => {
    timeField.textContent = `Time: ${time} sec`;
    time++;
  }, 1000);
}

function stopTime() {
  clearInterval(intervalId);
}

function gameFunc(card) {
  if (cardFlipped === 0 && fixFlag) {
    card.classList.add('flipped');
    cardFlipped++;
    firstFlipped = card;
    firstFlipped.style.pointerEvents = 'none';
    if (time === 0) {
      ++time;
      startTime();
    }
    fixFlag = !fixFlag;
    moves++;
  } else if (cardFlipped === 1 && !fixFlag) {
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
      fixFlag = !fixFlag;
    } else {
      secondFlipped.style.pointerEvents = 'none';
      setTimeout(() => {
        firstFlipped.classList.remove('flipped');
        firstFlipped.style.pointerEvents = 'auto';
        secondFlipped.classList.remove('flipped');
        secondFlipped.style.pointerEvents = 'auto';
        fixFlag = !fixFlag;
      }, 600);
    }

    moves++;
    cardFlipped = 0;
  }
  movesField.textContent = `${moves} moves`;

  if (stopCounter === cards.length / 2) {
    stopTime();
    winnerText.textContent = `Great job you did it in ${moves} moves and ${time} seconds!👏🏆`;
    popup.classList.add('activePopup');
    gamePanel.classList.add('activeBlur');
    restartButton.classList.add('active');
    timeField.textContent = `Time: ${time} sec`;
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
function reset() {
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
}

function closePopup() {
  popup.classList.remove('activePopup');
  gamePanel.classList.remove('activeBlur');
}

xBtn.addEventListener('click', closePopup);

restartButton.addEventListener('click', reset);

initGame();

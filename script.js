"use strict";
// debugger;
// "github.copilot.enable": false
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const current0El = document.getElementById("current--0");
const score1El = document.getElementById("score--1");
const current1El = document.getElementById("current--1");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const btnResetGame = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");
const name0El = document.getElementById("name--0");
const name1El = document.getElementById("name--1");

let currentScore, activePlayer, scores, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  player1.classList.remove("player--winner");
  player0.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  current0El.textContent = 0;
  diceEl.classList.add("hidden");
  name0El.textContent = "Player 1";
  name1El.textContent = "Player 2";
};

init();

const swithPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle("player--active");
  player0.classList.toggle("player--active");
};

const rollTheDice = function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove("hidden");

    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swithPlayer();
    }
  }
};

btnRoll.addEventListener("click", rollTheDice);
diceEl.addEventListener("click", rollTheDice);

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.getElementById(`name--${activePlayer}`).textContent = "winer!!";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    } else swithPlayer();
  }
});

btnResetGame.addEventListener("click", init);

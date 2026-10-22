
const player = document.getElementById("player");
const coin = document.getElementById("coin");
const scoreText = document.getElementById("score");
const game = document.getElementById("game");

const timerText = document.getElementById("timer");
const bestText = document.getElementById("best");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");

let x = 40;
let y = 150;
let score = 0;
let timeLeft = 60;
let gameOver = false;
let timerId;

const step = 20;
const playerSize = 38;

let best = Number(localStorage.getItem("recordMonedas")) || 0;
bestText.textContent = best;

function movePlayer(event) {
  if (gameOver) return;

  if (event.key === "ArrowRight") x += step;
  else if (event.key === "ArrowLeft") x -= step;
  else if (event.key === "ArrowUp") y -= step;
  else if (event.key === "ArrowDown") y += step;
  else return;

  event.preventDefault();

  x = Math.max(0, Math.min(x, game.clientWidth - playerSize));
  y = Math.max(0, Math.min(y, game.clientHeight - playerSize));

  player.style.left = x + "px";
  player.style.top = y + "px";

  checkCoin();
}

function placeCoin() {
  const maxX = Math.max(0, game.clientWidth - coin.offsetWidth);
  const maxY = Math.max(0, game.clientHeight - coin.offsetHeight);

  coin.style.left = Math.floor(Math.random() * maxX) + "px";
  coin.style.top = Math.floor(Math.random() * maxY) + "px";
}

function checkCoin() {
  const px = x + playerSize / 2;
  const py = y + playerSize / 2;
  const cx = coin.offsetLeft + coin.offsetWidth / 2;
  const cy = coin.offsetTop + coin.offsetHeight / 2;

  if (Math.abs(px - cx) < 35 && Math.abs(py - cy) < 35) {
    score++;
    scoreText.textContent = score;

    if (score > best) {
      best = score;
      bestText.textContent = best;
      localStorage.setItem("recordMonedas", best);
    }

    placeCoin();
  }
}

function endGame() {
  gameOver = true;
  clearInterval(timerId);
  message.textContent = `¡Tiempo terminado! Conseguíste ${score} puntos.`;
  restartButton.hidden = false;
}

function startGame() {
  clearInterval(timerId);

  x = 40;
  y = 150;
  score = 0;
  timeLeft = 60;
  gameOver = false;

  scoreText.textContent = score;
  timerText.textContent = timeLeft;
  message.textContent = "";
  restartButton.hidden = true;

  player.style.left = x + "px";
  player.style.top = y + "px";

  placeCoin();

  timerId = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

document.addEventListener("keydown", movePlayer);
restartButton.addEventListener("click", startGame);

startGame();


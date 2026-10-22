
const player = document.getElementById("player");
const coin = document.getElementById("coin");
const scoreText = document.getElementById("score");
const game = document.getElementById("game");

let x = 40;
let y = 150;
let score = 0;

const step = 20;
const playerSize = 38;

function movePlayer(event) {
  if (event.key === "ArrowRight") x += step;
  if (event.key === "ArrowLeft") x -= step;
  if (event.key === "ArrowUp") y -= step;
  if (event.key === "ArrowDown") y += step;

  x = Math.max(0, Math.min(x, game.clientWidth - playerSize));
  y = Math.max(0, Math.min(y, game.clientHeight - playerSize));

  player.style.left = x + "px";
  player.style.top = y + "px";

  checkCoin();
}

function checkCoin() {
  const px = x + playerSize / 2;
  const py = y + playerSize / 2;
  const cx = coin.offsetLeft + coin.offsetWidth / 2;
  const cy = coin.offsetTop + coin.offsetHeight / 2;

  if (Math.abs(px - cx) < 35 && Math.abs(py - cy) < 35) {
    score++;
    scoreText.textContent = score;

    const maxX = game.clientWidth - 40;
    const maxY = game.clientHeight - 40;

    coin.style.left = Math.floor(Math.random() * maxX) + "px";
    coin.style.top = Math.floor(Math.random() * maxY) + "px";
  }
}

document.addEventListener("keydown", movePlayer);

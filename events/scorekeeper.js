let gameInterface = {
  winningScore: 5,
  winningScoreDisplay: document.getElementById("winning-score"),
  winningScoreInput: document.getElementById("winning-score-input"),
  gameover: false,
  resetBtn: document.getElementById("reset-btn"),
  setScoreDisplay: function() { this.winningScoreDisplay.textContent = this.winningScore }
}
gameInterface.reset = function() {
  playerOne.score = 0;
  playerTwo.score = 0;
  gameInterface.gameover = false;

  playerOne.scoreDisplay.textContent = playerOne.score;
  playerTwo.scoreDisplay.textContent = playerTwo.score;

  playerOne.scoreDisplay.classList.remove("winner");
  playerTwo.scoreDisplay.classList.remove("winner");
}
gameInterface.updateScore = function(player) {
  if (!gameInterface.gameover) {
    player.score++;
    player.scoreDisplay.textContent = player.score;

    if (player.score === gameInterface.winningScore) {
      gameInterface.gameover = true;
      player.scoreDisplay.classList.toggle("winner");
    }
  }
}

gameInterface.resetBtn.addEventListener("click", function() {
  gameInterface.reset();
});
gameInterface.winningScoreInput.addEventListener("change", function() {
  gameInterface.reset();
  gameInterface.winningScore = Number(this.value);
  gameInterface.setScoreDisplay();
});

function Player(button, scoreDisplay, score) {
  this.button = button;
  this.scoreDisplay = scoreDisplay;
  this.score = score;
}
let playerOne = new Player(
  document.getElementById("p1-btn"),
  document.getElementById("p1-score"),
  0
);
let playerTwo = new Player(
  document.getElementById("p2-btn"),
  document.getElementById("p2-score"),
  0
);

playerOne.button.addEventListener("click", gameInterface.updateScore.bind(null, playerOne));
playerTwo.button.addEventListener("click", gameInterface.updateScore.bind(null, playerTwo));

gameInterface.setScoreDisplay();

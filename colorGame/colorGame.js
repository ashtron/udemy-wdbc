let functions = [];

// Get elements to manipulate.

let squares = document.getElementsByClassName("square");
let colorDisplay = document.getElementById("color-display");
let messageDisplay = document.getElementById("message");
let resetButton = document.getElementById("reset");
let h1 = document.querySelector("h1");
let easyButton = document.getElementById("easy");
let hardButton = document.getElementById("hard");

// Execution

let hardMode = true;
setGameLogic(squares);
resetButton.addEventListener("click", reset);
reset();

function adjustDifficulty() {
  if (!this.classList.contains("selected")) {
    hardMode = !hardMode;
    easyButton.classList.toggle("selected");
    hardButton.classList.toggle("selected");

    reset();
  }
}

easyButton.addEventListener("click", adjustDifficulty);
hardButton.addEventListener("click", adjustDifficulty);

// Function definitions.

function reset() {
  h1.style.backgroundColor = "#232323";
  resetButton.textContent = "New Colors";

  colors = generateRandomColors((hardMode ? 6 : 3));
  selectedColor = chooseColor(colors);
  colorDisplay.textContent = selectedColor;

  // Refactor to not give hidden three easy squares
  // undefined background color.

  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }

  for (var i = 3; i < squares.length; i++) {
    squares[i].style.display = (hardMode ? "block" : "none");
  }

  messageDisplay.textContent = "";
}
function generateRandomColors(n) {
  let colors = [];

  for (var i = 0; i < n; i++) {
    colors.push(generateRandomRGB());
  }

  return colors;
}
function generateRandomRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}
function changeColors(square) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = selectedColor;
  }
}
function chooseColor(colors) {
  let selectedColorIndex = Math.floor(Math.random() * colors.length);
  let selectedColor = colors[selectedColorIndex];

  return selectedColor;
}
function setGameLogic(squares) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function(square) {
      h1.style.backgroundColor = this.style.backgroundColor;

      let squareColor = this.style.backgroundColor;

      if (squareColor === selectedColor) {
        message.textContent = "Correct!";
        changeColors();
        resetButton.textContent = "Play again";
      } else {
        this.style.backgroundColor = "#232323";
        message.textContent = "Try again!";
      }
    });
  }
}

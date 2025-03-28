let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameContainer = document.querySelector(".game");
let mainContainer = document.querySelector("main");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  // Show main game elements
  mainContainer.style.display = "block";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) { // Player O
        box.innerText = "O";
        box.style.color = "#386641"; // Forest Green
        box.style.backgroundColor = "#F2E8CF"; // Cream
        turnO = false;
      } else { // Player X
        box.innerText = "X";
        box.style.color = "#BC4749"; // Earth Red
        box.style.backgroundColor = "#F2E8CF"; // Cream
        turnO = true;
      }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game is Drawn.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  // Hide main game elements
  mainContainer.style.display = "none";
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, The Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  // Hide main game elements
  mainContainer.style.display = "none";
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

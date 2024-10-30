let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");


let count = 0;

let turnSymbol = "O"; // Track the current symbol during the game

const winPatters = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  // Toggle the start symbol for the next game
  turnSymbol = turnSymbol === "X" ? "O" : "X";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnSymbol;
    box.disabled = true;

    count++; // Increment move count
    checkWinner();

    // Alternate turn symbol
    turnSymbol = turnSymbol === "X" ? "O" : "X";
    
    
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const draw = () => {
  msg.innerText = `DRAW`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const checkWinner = () => {
  let winnerfound = false;
  for (let pattern of winPatters) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && (pos2Val != "") & (pos3Val != "")) {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        winnerfound = true;
        


      }
    }

    if(!winnerfound && count===9){
      draw();
    }

  }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

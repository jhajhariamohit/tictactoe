const board = document.querySelector("#board");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartBtn = document.querySelector("#restart");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
    cell.addEventListener("mouseover", handleMouseOver);
    cell.addEventListener("mouseout", handleMouseOut);
});
restartBtn.addEventListener("click", restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (gameState[index] !== "" || !isGameActive()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "It's a tie!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== "" && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function isGameActive() {
    return !checkWin() && gameState.includes("");
}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = ""; // Reset background color
    });
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleMouseOver(event) {
    const cell = event.target;
    if (gameState[cell.getAttribute("data-index")] === "") {
        cell.style.backgroundColor = "grey";
    }
}

function handleMouseOut(event) {
    const cell = event.target;
    cell.style.backgroundColor = "";
}

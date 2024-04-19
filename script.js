// Initialize variables
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const cells = document.querySelectorAll('.cell');
let currentPlayer = '❌';
let gameActive = true;

// Winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Add click event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Reset button click event
resetBtn.addEventListener('click', resetGame);

// Handle cell click
function handleCellClick() {
  const cell = this;
  const index = parseInt(cell.getAttribute('data-index'));

  if (!gameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === '❌' ? '⭕' : '❌';
    setStatusText(`${currentPlayer}'s Turn`);
  }
}

// Check for a win
function checkWin(player) {
  return winningCombos.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

// Check for a draw
function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

// End the game
function endGame(draw) {
  if (draw) {
    setStatusText("It's a Draw!");
  } else {
    setStatusText(`${currentPlayer} Wins!`);
  }
  gameActive = false;
}

// Set status text
function setStatusText(message) {
  status.textContent = message;
}

// Reset the game
function resetGame() {
  currentPlayer = '❌';
  gameActive = true;
  setStatusText(`${currentPlayer}'s Turn`);
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

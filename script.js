const cells = document.querySelectorAll('.campo');
let currentPlayer = 'X';
let gameActive = true;

    cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (gameActive && !cell.textContent) {
                cell.textContent = currentPlayer;
      if (checkWinner(currentPlayer)) {
        endGame(currentPlayer);
      } else if (isDraw()) {
        endGame('draw');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O' && gameActive) {
          botMove();
        }
      }
            }
        });
    });

function checkWinner(player) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombos.some(combo => {
    return combo.every(index => cells[index].textContent === player);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

function endGame(result) {
  gameActive = false;
  if (result === 'draw') {
    alert('O jogo empatou!');
  } else {
    alert(`${result} venceu!`);
  }
}

function botMove() {
  const emptyCells = [...cells].filter(cell => !cell.textContent);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  
  setTimeout(() => {
    emptyCells[randomIndex].textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
      endGame(currentPlayer);
    } else if (isDraw()) {
      endGame('draw');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }, 1000);
}

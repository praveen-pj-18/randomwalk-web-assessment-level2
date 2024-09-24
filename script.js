const board = document.getElementById('board');
const gameStatus = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

let curr = 'X';
let gameIsOn = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 7, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `${curr} has won!`;
        gameIsOn = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        gameStatus.textContent = 'It\'s a draw!';
        gameIsOn = false;
        return;
    }

    curr = curr === 'X' ? 'O' : 'X';
    gameStatus.textContent = `${curr}'s turn`;
}

function nextMove(cellIndex) {
    if (!gameIsOn || gameState[cellIndex] !== '') return;

    gameState[cellIndex] = curr;
    cells[cellIndex].innerText = curr;

    if (curr === 'X') {
        cells[cellIndex].classList.add('x');
    } else {
        cells[cellIndex].classList.add('o');
    }

    handleResultValidation();
}

function resetGame() {
    curr = 'X';
    gameIsOn = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameStatus.textContent = `${curr}'s turn`;

    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o'); 
    });
}

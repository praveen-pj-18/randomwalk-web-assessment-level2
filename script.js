// Get the board, curr_status text, and all cell elements
const board = document.getElementById('board');
const curr_status = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

// Initialize variables for game state and current player
let curr = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Variables for storing scores
let xScore = 0;
let oScore = 0;
let drawScore = 0;

// Get the score elements from the DOM
const xScoreDisplay = document.getElementById('xScore');
const oScoreDisplay = document.getElementById('oScore');
const drawScoreDisplay = document.getElementById('drawScore');

// Define the winning conditions (rows, columns, diagonals)
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check is any player won
function check_result() {
    let roundWon = false;
    
    // checking is there any win
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        // Check if we find winner
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    // If a player wins
    if (roundWon) {
        curr_status.textContent = `${curr} has won!`;
        gameActive = false;
        
        // Update the score for the current player
        if (curr === 'X') {
            xScore++;
            xScoreDisplay.textContent = xScore;
        } else {
            oScore++;
            oScoreDisplay.textContent = oScore;
        }
        
        return;
    }

    // Check for a draw
    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        curr_status.textContent = 'It\'s a draw!';
        gameActive = false;
        
        // Update the draw score
        drawScore++;
        drawScoreDisplay.textContent = drawScore;
        
        return;
    }

    // Switch the player and update the curr_status
    curr = curr === 'X' ? 'O' : 'X';
    curr_status.textContent = `${curr}'s turn`;
}

// Function to handle a move (player clicks on a cell)
function makeMove(cellIndex) {
    if (!gameActive || gameState[cellIndex] !== '') return; // Prevent moves after game over or on already-filled cells

    // Update the game state and UI
    gameState[cellIndex] = curr;
    cells[cellIndex].innerText = curr;

    // Add color based on the player
    if (curr === 'X') {
        cells[cellIndex].classList.add('x');
    } else {
        cells[cellIndex].classList.add('o');
    }

    // Validate the result after every move
    check_result();
}

// Function to reset the game (restart)
function resetGame() {
    curr = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    curr_status.textContent = `${curr}'s turn`;

    // Clear the board and remove X and O styling
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
}

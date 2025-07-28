let board = [];
let isSolved = false;
const boardSize = 4;

const puzzleBoardElement = document.getElementById('puzzle-board');
const statusMessageElement = document.getElementById('status-message');
const newGameButton = document.getElementById('new-game-btn');

function getInversions(arr) {
    let inversions = 0;
    const flatArr = arr.filter(tile => tile !== 0);
    for (let i = 0; i < flatArr.length - 1; i++) {
        for (let j = i + 1; j < flatArr.length; j++) {
            if (flatArr[i] > flatArr[j]) {
                inversions++;
            }
        }
    }
    return inversions;
}

function initializeBoard() {
    isSolved = false;
    statusMessageElement.style.display = 'none'; 

    const solvedBoard = Array.from({ length: boardSize * boardSize }, (_, i) => i + 1);
    solvedBoard[boardSize * boardSize - 1] = 0;

    let shuffledBoard = [...solvedBoard];

    for (let i = shuffledBoard.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledBoard[i], shuffledBoard[j]] = [shuffledBoard[j], shuffledBoard[i]];
    }

    let inversions = getInversions(shuffledBoard);
    const emptyIndex = shuffledBoard.indexOf(0);
    const emptyRowFromTop = Math.floor(emptyIndex / boardSize); 
    const emptyRowFromBottom = boardSize - emptyRowFromTop; 

    if ((inversions + emptyRowFromBottom) % 2 !== 0) {
        let idx1 = -1, idx2 = -1;
        for (let i = 0; i < shuffledBoard.length; i++) {
            if (shuffledBoard[i] !== 0) {
                if (idx1 === -1) idx1 = i;
                else { idx2 = i; break; }
            }
        }
        if (idx1 !== -1 && idx2 !== -1) {
            [shuffledBoard[idx1], shuffledBoard[idx2]] = [shuffledBoard[idx2], shuffledBoard[idx1]];
        }
    }

    board = shuffledBoard;
    renderBoard();
}

function renderBoard() {
    puzzleBoardElement.innerHTML = ''; 

    board.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('puzzle-tile', 'd-flex', 'justify-content-center', 'align-items-center');

        if (tile === 0) {
            tileDiv.classList.add('empty-tile');
        } else {
            tileDiv.textContent = tile;
            tileDiv.onclick = () => handleTileClick(index); // Attach click handler
        }
        puzzleBoardElement.appendChild(tileDiv);
    });
}

function checkSolved() {
    for (let i = 0; i < boardSize * boardSize - 1; i++) {
        if (board[i] !== i + 1) {
            return false;
        }
    }
    return board[boardSize * boardSize - 1] === 0;
}

function handleTileClick(clickedIndex) {
    if (isSolved) return;

    const emptyIndex = board.indexOf(0);

    const clickedRow = Math.floor(clickedIndex / boardSize);
    const clickedCol = clickedIndex % boardSize;
    const emptyRow = Math.floor(emptyIndex / boardSize);
    const emptyCol = emptyIndex % boardSize;

    const isAdjacent =
        (clickedRow === emptyRow && Math.abs(clickedCol - emptyCol) === 1) ||
        (clickedCol === emptyCol && Math.abs(clickedRow - emptyRow) === 1);

    if (isAdjacent) {
        [board[clickedIndex], board[emptyIndex]] = [board[emptyIndex], board[clickedIndex]];
        renderBoard();

        if (checkSolved()) {
            isSolved = true;
            statusMessageElement.style.display = 'block';
        }
    }
}


document.addEventListener('DOMContentLoaded', initializeBoard);
newGameButton.addEventListener('click', initializeBoard);
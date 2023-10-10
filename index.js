const startBtn = document.querySelector('#startBtn');
const restartBtn = document.querySelector('#restartBtn');

const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector('.message').innerHTML = message;
    }
    return {
        renderMessage,
    }
})();

// Gameboard
const Gameboard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        let boardHTML = '';
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class='square' id='square-${index}'>${square}</div>`;
        })
        document.querySelector('.gameBoard').innerHTML = boardHTML;
        const squares = document.querySelectorAll('.square');
        console.log(squares);
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        });
    }

    const update = (index, value) => {
        gameBoard[index] = value;
        render();
    }

    const getGameboard = () => gameBoard;

    return {
        render,
        update,
        getGameboard
    }
})(); // IIFE


// Function that creates the players
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}


// Game 
const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, 'X'),
            createPlayer(document.querySelector('#player2').value, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        })
    }

    // Use target 
    const handleClick = (event) => {

        if (gameOver) {
            return; // stop handling clicks
        }

        let index = event.target.id.split('-')[1];
        // If square is occupied, don't change anything
        if (Gameboard.getGameboard()[index] != '') {
            return;
        }

        Gameboard.update(index, players[currentPlayerIndex].mark);

        if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins!`);
        }

        else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            displayController.renderMessage('It\'s a tie!');
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, '');
        }
        Gameboard.render();
        gameOver = false;
        displayController.renderMessage('');
    }

    return {
        start,
        restart,
        handleClick
    }
})(); // IIFE

function checkForTie(board) {
    return board.every(cell => cell != '');
}

function checkForWin(board, index) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

startBtn.addEventListener('click', () => {
    Game.start();
});

restartBtn.addEventListener('click', () => {
    Game.restart();
});
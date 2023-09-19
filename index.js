const startBtn = document.querySelector('#startBtn');
const restartBtn = document.querySelector('#restartBtn');

// Gameboard
const Gameboard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        let boardHTML = '';
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class='square' id='square-${index}'>${square}</div>`;
        })
        document.querySelector('.gameBoard').innerHTML = boardHTML;
    }

    return {
        render
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
    }

    return {
        start
    }
})(); // IIFE


startBtn.addEventListener('click', () => {
    Game.start();
});
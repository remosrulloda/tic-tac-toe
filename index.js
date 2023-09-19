let gameBoard = document.querySelector('.gameBoard');
let squares = document.querySelectorAll('.square');

const Gameboard = () => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        let boardHTML = '';
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class='square' id='square-${index}'>${square}</div>`;

        })
    }

    gameBoard.innerHTML = boardHTML;
};

const startBtn = document.querySelector('#startBtn');
const restartBtn = document.querySelector('#restartBtn');

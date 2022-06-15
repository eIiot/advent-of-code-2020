"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
// fix terrible windows encoding
input = input.replace(/\r/g, "");
let numbers = input.split('\n')[0].split(',');
numbers = numbers.map(v => parseInt(v));
let boards = input.split('\n\n');
// parse boards
boards = boards.map(board => board.split('\n').map(row => row.split(' ').filter(n => n).map(n => parseInt(n))));
boards.shift();
let allowedNumbers = [];
let lastNumber;
function findBoard() {
    for (let i = 0; i < numbers.length; i++) {
        lastNumber = numbers[i];
        allowedNumbers.push(lastNumber);
        // loop through boards, and check all cells in rows and columns
        for (let j = 0; j < boards.length; j++) {
            const board = boards[j];
            var rotatedBoard = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
            // check every item in board for all numbers less than I
            let checker = (arr, target) => target.every(v => arr.includes(v));
            for (let k = 0; k < board.length; k++) {
                const row = board[k];
                if (checker(allowedNumbers, row)) {
                    console.log({ row }, { board });
                    return board;
                }
            }
            for (let k = 0; k < rotatedBoard.length; k++) {
                const row = rotatedBoard[k];
                if (checker(allowedNumbers, row)) {
                    console.log({ row }, { rotatedBoard });
                    return rotatedBoard;
                }
            }
        }
    }
}
let winningBoard = findBoard();
console.log(allowedNumbers);
// take all values from board, remove all checked values, and sum
var sum = winningBoard.flat(1).filter(val => !allowedNumbers.includes(val)).reduce((a, b) => a + b, 0);
var score = sum * lastNumber;
console.log({ score });
debugger;
//# sourceMappingURL=part1.js.map
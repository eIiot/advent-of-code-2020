"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
// fix terrible windows encoding
input = input.replace(/\r/g, "");
var numbers = input.split('\n')[0].split(',');
numbers = numbers.map(function (v) { return parseInt(v); });
var boards = input.split('\n\n');
// parse boards
boards = boards.map(function (board) { return board.split('\n').map(function (row) { return row.split(' ').filter(function (n) { return n; }).map(function (n) { return parseInt(n); }); }); });
boards.shift();
var allowedNumbers = [];
var lastNumber;
function findBoard() {
    for (var i = 0; i < numbers.length; i++) {
        lastNumber = numbers[i];
        allowedNumbers.push(lastNumber);
        var _loop_1 = function (j) {
            var board = boards[j];
            rotatedBoard = board[0].map(function (_, colIndex) { return board.map(function (row) { return row[colIndex]; }); });
            // check every item in board for all numbers less than I
            var checker = function (arr, target) { return target.every(function (v) { return arr.includes(v); }); };
            for (var k = 0; k < board.length; k++) {
                var row = board[k];
                if (checker(allowedNumbers, row)) {
                    console.log({ row: row }, { board: board });
                    return { value: board };
                }
            }
            for (var k = 0; k < rotatedBoard.length; k++) {
                var row = rotatedBoard[k];
                if (checker(allowedNumbers, row)) {
                    console.log({ row: row }, { rotatedBoard: rotatedBoard });
                    return { value: rotatedBoard };
                }
            }
        };
        var rotatedBoard;
        // loop through boards, and check all cells in rows and columns
        for (var j = 0; j < boards.length; j++) {
            var state_1 = _loop_1(j);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
}
var winningBoard = findBoard();
console.log(allowedNumbers);
// take all values from board, remove all checked values, and sum
var sum = winningBoard.flat(1).filter(function (val) { return !allowedNumbers.includes(val); }).reduce(function (a, b) { return a + b; }, 0);
var score = sum * lastNumber;
console.log({ score: score });
debugger;
//# sourceMappingURL=part1.js.map
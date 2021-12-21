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
var winningBoards = [];
var lastNumber;
var checker = function (arr, target) { return target.every(function (v) { return arr.includes(v); }); };
function findBoard() {
    for (var i = 0; i < numbers.length; i++) {
        lastNumber = numbers[i];
        allowedNumbers.push(lastNumber);
        var _loop_1 = function (j) {
            if (winningBoards.length == boards.length - 1) {
                var _loop_2 = function (k) {
                    if (!winningBoards.includes(k)) {
                        var loosingBoard_1 = boards[k];
                        // check if board wins or not
                        rotatedLoosingBoard = loosingBoard_1[0].map(function (_, colIndex) { return loosingBoard_1.map(function (row) { return row[colIndex]; }); });
                        for (var k_1 = 0; k_1 < loosingBoard_1.length; k_1++) {
                            var row = loosingBoard_1[k_1];
                            if (checker(allowedNumbers, row)) {
                                return { value: loosingBoard_1 };
                            }
                        }
                        for (var k_2 = 0; k_2 < rotatedLoosingBoard.length; k_2++) {
                            var row = rotatedLoosingBoard[k_2];
                            if (checker(allowedNumbers, row)) {
                                return { value: loosingBoard_1 };
                            }
                        }
                    }
                };
                // loop through boards until you find number that doesn't match
                for (var k = 0; k < boards.length; k++) {
                    var state_2 = _loop_2(k);
                    if (typeof state_2 === "object")
                        return state_2;
                }
            }
            var board = boards[j];
            rotatedBoard = board[0].map(function (_, colIndex) { return board.map(function (row) { return row[colIndex]; }); });
            // check every item in board for all numbers less than I
            for (var k = 0; k < board.length; k++) {
                var row = board[k];
                if (checker(allowedNumbers, row)) {
                    if (!board.doNotAdd) {
                        // console.log(`Found matching row: ${row}. Adding board ${j}`)
                        winningBoards.push(j);
                        board.doNotAdd = true;
                    }
                    ;
                }
            }
            for (var k = 0; k < rotatedBoard.length; k++) {
                var row = rotatedBoard[k];
                if (checker(allowedNumbers, row)) {
                    if (!board.doNotAdd) {
                        // console.log(`Found matching row: ${row}. Adding board ${j}`)
                        winningBoards.push(j);
                        board.doNotAdd = true;
                    }
                    ;
                }
            }
        };
        var rotatedLoosingBoard, rotatedBoard;
        // loop through boards, and check all cells in rows and columns
        for (var j = 0; j < boards.length; j++) {
            var state_1 = _loop_1(j);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
}
var loosingBoard = findBoard();
// take all values from board, remove all checked values, and sum
var sum = loosingBoard.flat(1).filter(function (val) { return !allowedNumbers.includes(val); }).reduce(function (a, b) { return a + b; }, 0);
var score = sum * lastNumber;
console.log({ score: score });
debugger;
//# sourceMappingURL=part2.js.map
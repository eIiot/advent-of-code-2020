const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');

// fix terrible windows encoding
input = input.replace(/\r/g, "");

let numbers = input.split('\n')[0].split(',');

numbers = numbers.map(v => parseInt(v))

let boards = input.split('\n\n');

// parse boards
boards = boards.map(board => board.split('\n').map(row => row.split(' ').filter(n => n).map(n => parseInt(n))));
boards.shift()

let allowedNumbers = [];
let winningBoards = [];
let lastNumber;

let checker = (arr, target) => target.every(v => arr.includes(v));

function findBoard() {
  for (let i = 0; i < numbers.length; i++) {
    lastNumber = numbers[i];

    allowedNumbers.push(lastNumber);
    
    // loop through boards, and check all cells in rows and columns

    for (let j = 0; j < boards.length; j++) {
      if (winningBoards.length == boards.length-1) {
        // loop through boards until you find number that doesn't match
        for (let k = 0; k < boards.length; k++) {
          if (!winningBoards.includes(k)) {
            const loosingBoard = boards[k]
            // check if board wins or not
            var rotatedLoosingBoard = loosingBoard[0].map((_, colIndex) => loosingBoard.map(row => row[colIndex]));

            for (let k = 0; k < loosingBoard.length; k++) {
              const row = loosingBoard[k];
              if (checker(allowedNumbers,row)) {
                return loosingBoard;
              }
            }
      
            for (let k = 0; k < rotatedLoosingBoard.length; k++) {
              const row = rotatedLoosingBoard[k];
              if (checker(allowedNumbers,row)) {
                return loosingBoard;
              }
            }
          }
        }
      }

      const board = boards[j];
      var rotatedBoard = board[0].map((_, colIndex) => board.map(row => row[colIndex]));

      // check every item in board for all numbers less than I

      for (let k = 0; k < board.length; k++) {
        const row = board[k];
        if (checker(allowedNumbers,row)) {
          if (!board.doNotAdd) {
            // console.log(`Found matching row: ${row}. Adding board ${j}`)
            winningBoards.push(j);
            board.doNotAdd = true;
          };
        }
      }

      for (let k = 0; k < rotatedBoard.length; k++) {
        const row = rotatedBoard[k];
        if (checker(allowedNumbers,row)) {
          if (!board.doNotAdd) {
            // console.log(`Found matching row: ${row}. Adding board ${j}`)
            winningBoards.push(j);
            board.doNotAdd = true;
          };
        }
      }
      
    }
  }
}

let loosingBoard = findBoard();

// take all values from board, remove all checked values, and sum

var sum = loosingBoard.flat(1).filter(val => !allowedNumbers.includes(val)).reduce((a,b) => a+b, 0);

var score = sum * lastNumber;

console.log({score})

export {}
debugger;
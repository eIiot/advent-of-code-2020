"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var notes = input.split(/\n/).map(n => n.split(' | ').map(n => n.split(' ')));
notes.forEach(function (note, index, array) {
    array[index].shift();
});
notes = notes.flat(Infinity);
console.log(notes);
var numOfOneFourSevenEight = 0;
notes.forEach(element => {
    if (element.length == 2 || element.length == 4 || element.length == 3 || element.length == 7) {
        numOfOneFourSevenEight++;
    }
});
console.log(numOfOneFourSevenEight);
debugger;
//# sourceMappingURL=part1.js.map
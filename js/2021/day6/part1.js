"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
var input = fs.readFileSync('./example.txt', 'utf-8');
input = input.replace(/\r/g, "");
var fish = input.split(",").map(v => parseInt(v));
for (let i = 0; i < 80; i++) {
    fish = fish.map(v => v - 1);
    fish.forEach(function (timer, index, array) {
        if (timer < 0) {
            array[index] = 6;
            array.push(8);
        }
        ;
    });
}
;
console.log(fish.length);
debugger;
//# sourceMappingURL=part1.js.map
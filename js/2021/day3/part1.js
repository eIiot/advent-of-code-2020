"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
const report = input.split(/\r?\n/);
const bitFrequency = [];
for (let i = 0; i < report[0].length; i++) {
    bitFrequency[i] = 0;
}
for (let i = 0; i < report.length; i++) {
    const binaryArray = report[i].split('');
    for (let j = 0; j < binaryArray.length; j++) {
        const bit = binaryArray[j];
        if (bit == 1) {
            bitFrequency[j]++;
        }
    }
}
var gammaRateBinary = '';
for (let i = 0; i < bitFrequency.length; i++) {
    const totalBits = bitFrequency[i];
    console.log(totalBits);
    console.log(report.length);
    if (parseInt(totalBits) < (report.length / 2)) {
        gammaRateBinary = gammaRateBinary.concat('1');
    }
    else {
        gammaRateBinary = gammaRateBinary.concat('0');
    }
}
;
var epsilonRateBinary = gammaRateBinary.split('').map(x => 1 - parseInt(x)).join('');
var epsilonRate = parseInt(epsilonRateBinary, 2);
var gammaRate = parseInt(gammaRateBinary, 2);
console.log({ epsilonRate, gammaRate });
console.log(epsilonRate * gammaRate);
debugger;
//# sourceMappingURL=part1.js.map
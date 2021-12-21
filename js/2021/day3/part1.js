"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
var report = input.split(/\r?\n/);
var bitFrequency = [];
for (var i = 0; i < report[0].length; i++) {
    bitFrequency[i] = 0;
}
for (var i = 0; i < report.length; i++) {
    var binaryArray = report[i].split('');
    for (var j = 0; j < binaryArray.length; j++) {
        var bit = binaryArray[j];
        if (bit == 1) {
            bitFrequency[j]++;
        }
    }
}
var gammaRateBinary = '';
for (var i = 0; i < bitFrequency.length; i++) {
    var totalBits = bitFrequency[i];
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
var epsilonRateBinary = gammaRateBinary.split('').map(function (x) { return 1 - parseInt(x); }).join('');
var epsilonRate = parseInt(epsilonRateBinary, 2);
var gammaRate = parseInt(gammaRateBinary, 2);
console.log({ epsilonRate: epsilonRate, gammaRate: gammaRate });
console.log(epsilonRate * gammaRate);
debugger;
//# sourceMappingURL=part1.js.map
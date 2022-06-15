"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
const report = input.split(/\r?\n/);
function mostFrequentBit(arr, bitPos) {
    var totalBits = 0;
    for (let i = 0; i < arr.length; i++) {
        const bit = arr[i][bitPos];
        totalBits += parseInt(bit);
    }
    if (totalBits < (arr.length / 2)) {
        return 0;
    }
    else {
        return 1;
    }
    ;
}
;
var o2Report = report;
// loop through the number of bits
for (let i = 0; i < report[0].split('').length; i++) {
    if (o2Report.length == 1) {
        continue;
    }
    ;
    var mfBit = mostFrequentBit(o2Report, i);
    const newO2Report = [];
    for (let j = 0; j < o2Report.length; j++) {
        const binary = o2Report[j];
        if (binary.split('')[i] == mfBit) {
            console.log(`Keeping ${j} (value ${binary}) because bit ${i} is ${mfBit}`);
            newO2Report.push(binary);
        }
        ;
    }
    ;
    o2Report = newO2Report;
}
;
console.log(o2Report);
var co2Report = report;
console.log(co2Report.toString());
// loop through the number of bits
for (let i = 0; i < report[0].split('').length; i++) {
    if (co2Report.length == 1) {
        continue;
    }
    ;
    var mfBit = mostFrequentBit(co2Report, i);
    const newCO2Report = [];
    for (let j = 0; j < co2Report.length; j++) {
        const binary = co2Report[j];
        if (binary.split('')[i] != mfBit) {
            console.log(`Keeping ${j} (value ${binary}) because bit ${i} is ${mfBit}`);
            newCO2Report.push(binary);
        }
        ;
    }
    ;
    co2Report = newCO2Report;
}
;
console.log(co2Report);
var lifeSupportRating = parseInt(o2Report[0], 2) * parseInt(co2Report[0], 2);
console.log({ lifeSupportRating });
debugger;
//# sourceMappingURL=part2.js.map
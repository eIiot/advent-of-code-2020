"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
var report = input.split(/\r?\n/);
function mostFrequentBit(arr, bitPos) {
    var totalBits = 0;
    for (var i = 0; i < arr.length; i++) {
        var bit = arr[i][bitPos];
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
for (var i = 0; i < report[0].split('').length; i++) {
    if (o2Report.length == 1) {
        continue;
    }
    ;
    var mfBit = mostFrequentBit(o2Report, i);
    var newO2Report = [];
    for (var j = 0; j < o2Report.length; j++) {
        var binary = o2Report[j];
        if (binary.split('')[i] == mfBit) {
            console.log("Keeping ".concat(j, " (value ").concat(binary, ") because bit ").concat(i, " is ").concat(mfBit));
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
for (var i = 0; i < report[0].split('').length; i++) {
    if (co2Report.length == 1) {
        continue;
    }
    ;
    var mfBit = mostFrequentBit(co2Report, i);
    var newCO2Report = [];
    for (var j = 0; j < co2Report.length; j++) {
        var binary = co2Report[j];
        if (binary.split('')[i] != mfBit) {
            console.log("Keeping ".concat(j, " (value ").concat(binary, ") because bit ").concat(i, " is ").concat(mfBit));
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
console.log({ lifeSupportRating: lifeSupportRating });
debugger;
//# sourceMappingURL=part2.js.map
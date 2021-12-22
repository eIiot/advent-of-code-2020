"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var crabs = input.split(/,/);
crabs.map(function (v) { return parseInt(v); });
console.log(crabs);
// this is a bad way to do this
var maxCrabPos = Math.max.apply(null, crabs);
var possiblePositions = [];
for (var i = 0; i < maxCrabPos; i++) {
    // loop through array and check fuel values
    var totalFuelValue = 0;
    for (var j = 0; j < crabs.length; j++) {
        var crab = crabs[j];
        var distance = Math.abs(i - crab);
        totalFuelValue += (distance * (distance + 1)) / 2; // triangle numbers!
    }
    ;
    possiblePositions.push(totalFuelValue);
}
;
console.log(possiblePositions);
console.log(Math.min.apply(null, possiblePositions));
debugger;
//# sourceMappingURL=part2.js.map
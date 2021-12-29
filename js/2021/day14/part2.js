"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var template = input.split(/\n\n/)[0];
var rulesArr = input.split(/\n\n/)[1].split(/\n/).map(function (n) { return n.split(' -> '); });
function arr2obj(arr) {
    // Create an empty object
    var obj = {};
    arr.forEach(function (v) {
        // Extract the key and the value
        var key = v[0];
        var value = v[1];
        // Add the key and value to
        // the object
        obj[key] = value;
    });
    // Return the object
    return obj;
}
;
var rules = arr2obj(rulesArr);
// generate pair -> pair1 pair2
var pairRules = {};
for (var pair in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, pair)) {
        var rule = rules[pair];
        var pairArray = pair.split('');
        pairRules[pair] = [pairArray[0] + rule, rule + pairArray[1]];
    }
}
var pairCounts = {};
for (var j = 1; j < template.length; j++) {
    var letter = template[j];
    var previousLetter = template[j - 1];
    var pair = previousLetter + letter;
    pairCounts[pair] = pairCounts[pair] || 0;
    pairCounts[pair]++;
}
;
for (var i = 0; i < 40; i++) {
    var oldPairCounts = JSON.parse(JSON.stringify(pairCounts));
    for (var pair in pairCounts) {
        if (Object.prototype.hasOwnProperty.call(pairCounts, pair)) {
            var count = oldPairCounts[pair];
            // add the appropriate pairs to the count, and remove the old pair
            for (var i_1 = 0; i_1 < pairRules[pair].length; i_1++) {
                var rulePair = pairRules[pair][i_1];
                pairCounts[rulePair] = pairCounts[rulePair] || 0;
                pairCounts[rulePair] += count;
            }
            ;
            pairCounts[pair] -= count;
            if (pairCounts[pair] == 0)
                delete pairCounts[pair];
        }
        ;
    }
    ;
}
;
// find number of each letter
var charCounts = {};
for (var pair in pairCounts) {
    if (Object.prototype.hasOwnProperty.call(pairCounts, pair)) {
        var count_1 = pairCounts[pair];
        charCounts[pair.charAt(0)] = charCounts[pair.charAt(0)] || 0;
        charCounts[pair.charAt(0)] += count_1;
    }
    ;
}
;
// account for last char in array
charCounts[template.charAt(template.length - 1)]++;
var smallest = Infinity;
var largest = 0;
for (var letter in charCounts) {
    if (Object.prototype.hasOwnProperty.call(charCounts, letter)) {
        var num = charCounts[letter];
        if (num > largest)
            largest = num;
        if (num < smallest)
            smallest = num;
    }
}
;
var answer = largest - smallest;
console.log("Answer: ".concat(answer));
debugger;
//# sourceMappingURL=part2.js.map
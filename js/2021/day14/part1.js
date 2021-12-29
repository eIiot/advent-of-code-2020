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
for (var i = 0; i < 40; i++) {
    console.log(i);
    var newTemplate = template.split('');
    var numberOfInserts = 0;
    for (var j = 1; j < template.length; j++) {
        if (j % 1000 == 0)
            console.log(j);
        var letter = template[j];
        var previousLetter = template[j - 1];
        var string = previousLetter + letter;
        if (rules[string] != undefined) {
            newTemplate.splice(j + numberOfInserts, 0, rules[string]);
            numberOfInserts++;
        }
        ;
    }
    ;
    template = newTemplate.join('');
}
;
// count number of times each character appears in the string
var templateArray = template.split('');
templateArray.sort();
var letterOccurances = {};
for (var i = 1; i <= templateArray.length; i++) {
    var letter = templateArray[i];
    var lastLetter = templateArray[i - 1];
    // if last letter was different, log the last letter and the i val
    if (letter != lastLetter) {
        console.log("".concat(lastLetter, " occurs ").concat(i, " times"));
        // remove all of the last letter from the array
        templateArray.splice(0, i);
        letterOccurances[lastLetter] = i;
        i = 0;
    }
}
;
var smallest = Infinity;
var largest = 0;
for (var letter in letterOccurances) {
    if (Object.prototype.hasOwnProperty.call(letterOccurances, letter)) {
        var num = letterOccurances[letter];
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
//# sourceMappingURL=part1.js.map
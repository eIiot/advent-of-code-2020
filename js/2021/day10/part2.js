"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var lines = input.split(/\n/);
lines = lines.map(function (line) { return line.split(""); });
// assign a number value to each character - (7), [2], {3}, <5>
var opening = ["(", "[", "{", "<"];
var closing = [")", "]", "}", ">"];
var autocomplete = [];
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var chars = [];
    console.log("Reading line ".concat(i + 1));
    var isValid = true;
    for (var j = 0; j < line.length; j++) {
        var char = line[j];
        if (opening.includes(char)) {
            chars.push(char);
        }
        else if (closing.includes(char)) {
            if (closing[opening.indexOf(chars[chars.length - 1])] != char) {
                console.log("Line ".concat(i + 1, " is invalid: Expected ").concat(closing[opening.indexOf(chars[chars.length - 1])], ", but found ").concat(char, " at position ").concat(j + 1));
                break;
            }
            else if (closing[opening.indexOf(chars[chars.length - 1])] == char) {
                chars.pop();
            }
            else {
                throw new Error("Invalid Syntax");
            }
        }
        else {
            throw new Error("Invalid Character");
        }
        ;
        if (j == line.length - 1) {
            // finishing lines
            console.log("Line ".concat(i + 1, " is valid"));
            autocomplete.push(chars.reverse());
        }
        ;
    }
    ;
}
;
var scores = [];
// calculate final score
autocomplete.forEach(function (end) {
    var score = 0;
    end.forEach(function (char) {
        score *= 5;
        if (char == "(") {
            score += 1;
        }
        else if (char == "[") {
            score += 2;
        }
        else if (char == "{") {
            score += 3;
        }
        else if (char == "<") {
            score += 4;
        }
        ;
    });
    scores.push(score);
});
scores.sort(function (a, b) {
    return a - b;
});
var middle = scores[(scores.length - 1) / 2];
console.log("Middle Score: ".concat(middle));
debugger;
//# sourceMappingURL=part2.js.map
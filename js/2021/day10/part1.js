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
var invalidChars = [];
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
                invalidChars.push(char);
                var isValid = false;
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
    }
    ;
    if (isValid) {
        console.log("Line ".concat(i + 1, " is valid"));
    }
}
;
// check final score 
var score = 0;
invalidChars.forEach(function (char) {
    if (char == ")") {
        score += 3;
    }
    else if (char == "]") {
        score += 57;
    }
    else if (char == "}") {
        score += 1197;
    }
    else if (char == ">") {
        score += 25137;
    }
    ;
});
console.log("Score: ".concat(score));
debugger;
//# sourceMappingURL=part1.js.map
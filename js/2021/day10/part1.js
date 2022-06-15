"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var lines = input.split(/\n/);
lines = lines.map(line => line.split(""));
// assign a number value to each character - (7), [2], {3}, <5>
const opening = ["(", "[", "{", "<"];
const closing = [")", "]", "}", ">"];
const invalidChars = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const chars = [];
    console.log(`Reading line ${i + 1}`);
    var isValid = true;
    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (opening.includes(char)) {
            chars.push(char);
        }
        else if (closing.includes(char)) {
            if (closing[opening.indexOf(chars[chars.length - 1])] != char) {
                console.log(`Line ${i + 1} is invalid: Expected ${closing[opening.indexOf(chars[chars.length - 1])]}, but found ${char} at position ${j + 1}`);
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
        console.log(`Line ${i + 1} is valid`);
    }
}
;
// check final score 
var score = 0;
invalidChars.forEach(char => {
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
console.log(`Score: ${score}`);
debugger;
//# sourceMappingURL=part1.js.map
import { error } from "console";

const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');
input = input.replace(/\r/g, "");

var lines = input.split(/\n/);

lines = lines.map(line => line.split(""));

// assign a number value to each character - (7), [2], {3}, <5>

const opening = ["(","[","{","<"];
const closing = [")","]","}",">"];

const autocomplete = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const chars = [];

  console.log(`Reading line ${i+1}`);

  var isValid = true;
  
  for (let j = 0; j < line.length; j++) {
    const char = line[j];

    if (opening.includes(char)) {
      chars.push(char);
    } else if (closing.includes(char)) {
      if (closing[opening.indexOf(chars[chars.length-1])] != char) {
        console.log(`Line ${i+1} is invalid: Expected ${closing[opening.indexOf(chars[chars.length-1])]}, but found ${char} at position ${j+1}`)
        break;
      } else if (closing[opening.indexOf(chars[chars.length-1])] == char) {
        chars.pop();
      } else {
        throw new Error("Invalid Syntax");
      }
    } else {
      throw new Error("Invalid Character");
    };

    if (j == line.length-1) {
      // finishing lines
      console.log(`Line ${i+1} is valid`)
      autocomplete.push(chars.reverse());
    };
  };
};

var scores = [];
// calculate final score
autocomplete.forEach(end => {
  var score = 0;
  end.forEach(char => {
    score *= 5;
    if (char == "(") {
      score += 1;
    } else if (char == "[") {
      score += 2;
    } else if (char == "{") {
      score += 3;
    } else if (char == "<") {
      score += 4;
    };
  });
  scores.push(score);
});

scores.sort(function(a, b) {
  return a - b;
});

var middle = scores[(scores.length-1)/2];

console.log(`Middle Score: ${middle}`);

export {}
debugger;
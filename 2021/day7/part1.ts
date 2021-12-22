const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');
input = input.replace(/\r/g, "");

const crabs = input.split(/,/);

crabs.map(v => parseInt(v));

console.log(crabs)

// this is a bad way to do this

var maxCrabPos = Math.max.apply(null,crabs);

var possiblePositions = [];

for (let i = 0; i < maxCrabPos; i++) {
  // loop through array and check fuel values
  var totalFuelValue = 0;
  for (let j = 0; j < crabs.length; j++) {
    const crab = crabs[j];
    totalFuelValue += Math.abs(i-crab)
  };
  possiblePositions.push(totalFuelValue);
};

console.log(possiblePositions)
console.log(Math.min.apply(null,possiblePositions));

export {}
debugger;
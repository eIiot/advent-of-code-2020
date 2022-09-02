const fs = require("fs");

var input = fs.readFileSync("./input.txt", "utf-8");

// split input into arrays

const measurements = input.split("\n");

console.log(measurements);

var increases = 0;

for (let i = 0; i < measurements.length; i++) {
  const number = measurements[i];
  const lastNumber = measurements[i - 1];

  if (parseInt(number) > parseInt(lastNumber)) {
    increases++;
  }
}

console.log(increases);

debugger;

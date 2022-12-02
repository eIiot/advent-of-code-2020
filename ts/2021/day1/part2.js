const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8')

// split input into arrays

const measurements = input.split('\n')

console.log(measurements);

var increases = 0;

for (let i = 0; i < measurements.length; i++) {
  var window = parseInt(measurements[i]) + parseInt(measurements[i+1]) + parseInt(measurements[i+2]);
  var lastWindow = parseInt(measurements[i-1]) + parseInt(measurements[i]) + parseInt(measurements[i+1]);
  
  if (window > lastWindow) {
    increases++;
  }
}

console.log(increases)

debugger;
const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');
input = input.replace(/\r/g, "");

var fish = input.split(",").map(v => parseInt(v))

// move fish into containers depending on age
const containers = new Array(9).fill(0);

fish.forEach(timer => {
  containers[timer]++;
});

// iterate through days, and move fish down buckets
for (let days = 0; days < 256; days++) {
  var lastBucket = containers[0];
  containers.shift();
  containers[6] += lastBucket;
  containers[8] = lastBucket;
  console.log(containers)
};

console.log(containers);
console.log(containers.reduce((a,b) => a + b, 0));

export {}
debugger;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var fish = input.split(",").map(function (v) { return parseInt(v); });
// move fish into containers depending on age
var containers = new Array(9).fill(0);
fish.forEach(function (timer) {
    containers[timer]++;
});
// iterate through days, and move fish down buckets
for (var days = 0; days < 256; days++) {
    var lastBucket = containers[0];
    containers.shift();
    containers[6] += lastBucket;
    containers[8] = lastBucket;
    console.log(containers);
}
;
console.log(containers);
console.log(containers.reduce(function (a, b) { return a + b; }, 0));
debugger;
//# sourceMappingURL=part2.js.map
// [7.21ms] parsing
// [0.00ms] find sum of three largest values
// Sum of top three elves: 206780

import {input, examples} from "./input"

console.time("parsing")

const list = input; 

const elfs = list.split("\n\n");

const mappedElfs = elfs.map(l => l.split("\n").map(s => +s))

const summedElfs = mappedElfs.map(l => l.reduce((a, b) => a + b)).sort((a, b) => b - a)

console.timeEnd("parsing")

console.time("find sum of three largest values")

const sumOfThreeLargest = summedElfs[0] + summedElfs[1] + summedElfs[2]

console.timeEnd("find sum of three largest values");

console.log("Sum of top three elves:", sumOfThreeLargest)
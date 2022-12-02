// [4.74ms] parsing
// [0.16ms] find largest
// Largest calorie count: 69626

import {input, examples} from "./input"

console.time("parsing")

const list = input; 

const elfs = list.split("\n\n");

const mappedElfs = elfs.map(l => l.split("\n").map(s => +s))

const summedElfs = mappedElfs.map(l => l.reduce((a, b) => a + b))

console.timeEnd("parsing")

console.time("find largest")

const largest = Math.max(...summedElfs);

console.timeEnd("find largest")

console.log("Largest calorie count:", largest)
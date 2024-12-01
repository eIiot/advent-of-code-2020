import fs from 'fs/promises';

const example = `3   4
4   3
2   5
1   3
3   9
3   3`

const inputFile = Bun.file('./input.txt');
const input = await inputFile.text();

const side1: number[] = [];

const side2: number[] = [];

input.split('\n').forEach(line => {
  if (line !== '') {
    const [a, b] = line.split('   ')

    side1.push(+a);
    side2.push(+b);
  }
})

const sortedSide1 = side1.sort((a, b) => a - b);
const sortedSide2 = side2.sort((a, b) => a - b);

let sum = 0;

sortedSide1.forEach((a, i) => {
  const dist = Math.abs(a - sortedSide2[i]);

  console.log(a, sortedSide2[i], dist);

  sum += dist;
})

console.log(sum);


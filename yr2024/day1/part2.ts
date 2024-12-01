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

let sum = 0;

side1.forEach((a) => {
  let appearances = side2.filter(
    (b, j) => b === a
  ).length;

  const score = a * appearances;

  sum += score;
})

console.log(sum);


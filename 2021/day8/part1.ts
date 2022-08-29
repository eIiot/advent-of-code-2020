import input from "./input";
import { example1, example2 } from "./example";

console.time("parsing");

let notes = input
  .split(/\n/)
  .map((n) => n.split(" | ").map((n) => n.split(" ")));

notes.forEach(function (note, index, array) {
  array[index].shift();
});

let flatNotes = notes.flat(Infinity);

console.timeEnd("parsing");

console.time("count");

let numOfOneFourSevenEight = 0;

flatNotes.forEach((element) => {
  if (
    element.length == 2 ||
    element.length == 4 ||
    element.length == 3 ||
    element.length == 7
  ) {
    numOfOneFourSevenEight++;
  }
});

console.timeEnd("count");

console.log("digits 1, 4, 7, or 8 appear", numOfOneFourSevenEight, "times");

debugger;

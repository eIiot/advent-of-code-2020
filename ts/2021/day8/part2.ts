// Sum of all values: 978171
// [16.03ms] Total Time

import input from "./input";
import { example1, example2, example3 } from "./example";

console.time("Total Time");

let notes = input
  .split(/\n/)
  .map((n) => n.split(" | ").map((n) => n.split(" ")));

// create an array with

// find mappings for 1

const numberMappings = {
  abcefg: "0",
  cf: "1",
  acdeg: "2",
  acdfg: "3",
  bcdf: "4",
  abdfg: "5",
  abdefg: "6",
  acf: "7",
  abcdefg: "8",
  abcdfg: "9",
};

const parseNote = (note: string[][]) => {
  let patterns = note[0];

  let output = note[1];

  const mappings = {
    a: ["a", "b", "c", "d", "e", "f", "g"],
    b: ["a", "b", "c", "d", "e", "f", "g"],
    c: ["a", "b", "c", "d", "e", "f", "g"],
    d: ["a", "b", "c", "d", "e", "f", "g"],
    e: ["a", "b", "c", "d", "e", "f", "g"],
    f: ["a", "b", "c", "d", "e", "f", "g"],
    g: ["a", "b", "c", "d", "e", "f", "g"],
  };

  // define possibilites for 1

  let one = patterns.find((a) => a.length == 2).split("");

  for (const key in mappings) {
    if (Object.prototype.hasOwnProperty.call(mappings, key)) {
      if (key == "c" || key == "f") {
        mappings[key] = mappings[key].filter((letter) => one.includes(letter));
      } else {
        mappings[key] = mappings[key].filter((letter) => !one.includes(letter));
      }
    }
  }

  let four = patterns.find((a) => a.length == 4).split("");

  for (const key in mappings) {
    if (Object.prototype.hasOwnProperty.call(mappings, key)) {
      if (key == "b" || key == "d" || key == "c" || key == "f") {
        mappings[key] = mappings[key].filter((letter) => four.includes(letter));
      } else {
        mappings[key] = mappings[key].filter(
          (letter) => !four.includes(letter)
        );
      }
    }
  }

  let seven = patterns.find((a) => a.length == 3).split("");

  for (const key in mappings) {
    if (Object.prototype.hasOwnProperty.call(mappings, key)) {
      if (key == "a" || key == "c" || key == "f") {
        mappings[key] = mappings[key].filter((letter) =>
          seven.includes(letter)
        );
      } else {
        mappings[key] = mappings[key].filter(
          (letter) => !seven.includes(letter)
        );
      }
    }
  }

  // identify possibilites for d, c, and e by finding all patterns with length 6

  let patternsWithLengthSix = [];

  patterns.forEach((pattern) => {
    if (pattern.length == 6) {
      patternsWithLengthSix.push(pattern);
    }
  });

  // find digits that aren't common

  let appearsTwiceInLengthSix = [];

  patternsWithLengthSix.forEach((pattern, index) => {
    pattern.split("").forEach((letter) => {
      // check if letter exists in exactly 2 other items
      let i = 0;

      patternsWithLengthSix.forEach((pattern2, index2) => {
        if (pattern2.includes(letter)) {
          i++;
        }
      });

      if (i == 2) {
        appearsTwiceInLengthSix.push(letter);
      }
    });
  });

  for (const key in mappings) {
    if (Object.prototype.hasOwnProperty.call(mappings, key)) {
      if (key == "d" || key == "c" || key == "e") {
        mappings[key] = mappings[key].filter((letter) =>
          appearsTwiceInLengthSix.includes(letter)
        );
      }
    }
  }

  // for all defined letters, remove those letters from any other brackets that may have them

  for (const key in mappings) {
    if (Object.prototype.hasOwnProperty.call(mappings, key)) {
      if (mappings[key].length == 1) {
        for (const subkey in mappings) {
          if (Object.prototype.hasOwnProperty.call(mappings, subkey)) {
            if (subkey != key) {
              mappings[subkey] = mappings[subkey].filter(
                (letter) => !mappings[key].includes(letter)
              );
            }
          }
        }
      }
    }
  }

  // WE HAVE UNIQUE LETTERS

  /**
   * Random value -> Defined value
   */
  let flippedMappings = Object.fromEntries(
    Object.entries(mappings).map(([key, value]) => [value[0], key])
  );

  // fix outputs

  var re = new RegExp(Object.keys(flippedMappings).join("|"), "gi");
  output = output
    .join(",")
    .replace(re, (matched) => {
      return flippedMappings[matched];
    })
    .split(",");

  const sortedOutput = output.map((string) => string.split("").sort().join(""));

  let finalNum = "";

  sortedOutput.forEach((number) => {
    finalNum += numberMappings[number];
  });

  return +finalNum;
};
let sumOfAllValues = 0;

notes.forEach((note) => {
  let number = parseNote(note);
  sumOfAllValues += number;
});

console.log("Sum of all values:", sumOfAllValues);

console.timeEnd("Total Time");

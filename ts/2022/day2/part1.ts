import { input, examples } from "./input";
import * as AOC from "../../helper";

const lines = input.split("\n");

const scores = {
  X: 1,
  Y: 2,
  Z: 3,
};

const pairSocres = {
  AY: 6,
  BZ: 6,
  CX: 6,
  AX: 3,
  BY: 3,
  CZ: 3,
};

const splitLines = lines.map((line) => line.split(" "));

let score = 0;

splitLines.forEach((line) => {
  const didntLoose = !!pairSocres[line.join("")];

  const roundScore =
    scores[line[1]] + (didntLoose ? pairSocres[line.join("")] : 0);

  console.log(roundScore);

  score += roundScore;
});

console.log(score);

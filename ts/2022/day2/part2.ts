import { input, examples } from "./input";
import * as AOC from "../../helper";

const lines = input.split("\n");

const scores = {
  X: 1,
  Y: 2,
  Z: 3,
};

// x: lose
// y: draw
// z: win

const pairMappings = {
  AY: "Z",
  BZ: "Z",
  CX: "Z",
  AX: "Y",
  BY: "Y",
  CZ: "Y",
};

const pairSocres = {
  AY: 6,
  BZ: 6,
  CX: 6,
  AX: 3,
  BY: 3,
  CZ: 3,
};

const posibilites = ["X", "Y", "Z"];

const splitLines = lines.map((line) => line.split(" "));

let score = 0;

splitLines.forEach((line) => {
  posibilites.forEach((posibility) => {
    if (!pairMappings[line[0] + posibility] && line[1] === "X") {
      console.log(line[0] + posibility);
      score += scores[posibility];
    } else if (pairMappings[line[0] + posibility] === line[1]) {
      console.log(line[0] + posibility);
      score += scores[posibility] + pairSocres[line[0] + posibility];
    }
  });
});

console.log(score);

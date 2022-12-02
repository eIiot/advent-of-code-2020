// [25.80ms] launches
// Highest Y Position: 6441
// [26.22ms] Total Time

import { input, examples } from "./input";
import { writeFileSync } from "fs";

console.time("Total Time");

const parseInput = (input: string): [[number, number], [number, number]] => {
  let input2 = "target area: x=153..199, y=-114..-75";
  let trimmed = input2.substring(13);
  let xY = trimmed.split(", ");
  return xY.map((val) =>
    val
      .substring(2)
      .split("..")
      .map((num) => +num)
  ) as [[number, number], [number, number]];
};

let targetArea = parseInput(input);

const renderTrajectory = (
  hist: [number, number][],
  targetArea: [[number, number], [number, number]]
) => {
  /**
   * [
   *  [minX, maxX],
   *  [minY, maxY]
   * ]
   */
  let arrayCoords = JSON.parse(JSON.stringify(targetArea));

  // assign the smallest

  hist.forEach(([x, y]) => {
    arrayCoords[0][0] = x < arrayCoords[0][0] ? x : arrayCoords[0][0];
    arrayCoords[0][1] = x > arrayCoords[0][1] ? x : arrayCoords[0][1];
    arrayCoords[1][0] = y < arrayCoords[1][0] ? y : arrayCoords[1][0];
    arrayCoords[1][1] = y > arrayCoords[1][1] ? y : arrayCoords[1][1];
  });

  // offset all values by the - of the min values, to 0

  let xOffset = -arrayCoords[0][0];
  let yOffset = -arrayCoords[1][0];

  let fixedArrayCoords = [];

  fixedArrayCoords[0] = arrayCoords[0].map((x) => x + xOffset);
  fixedArrayCoords[1] = arrayCoords[1].map((y) => y + yOffset);

  hist = hist.map(([x, y]) => [x + xOffset, y + yOffset]);

  let fixedTargetArea = [];

  fixedTargetArea[0] = targetArea[0].map((x) => x + xOffset);
  fixedTargetArea[1] = targetArea[1].map((y) => y + yOffset);

  // create array

  const renderArray = [...Array(fixedArrayCoords[1][1] + 1)].map((_) =>
    Array(fixedArrayCoords[0][1] + 1).fill(".")
  );

  // render target area

  for (let i = fixedTargetArea[1][0]; i <= fixedTargetArea[1][1]; i++) {
    let fixedYVal = fixedArrayCoords[1][1] - i;

    for (let j = targetArea[0][0]; j <= targetArea[0][1]; j++) {
      renderArray[fixedYVal][j] = "T";
    }
  }

  // render coords

  hist.forEach(([x, y]) => {
    renderArray[fixedArrayCoords[1][1] - y][x] = "#";
  });

  // render start point

  renderArray[fixedArrayCoords[1][1] - hist[0][1]][hist[0][0]] = "S";

  return renderArray.map((n) => n.join("")).join("\n");
};

const launchProbe = (initialVelocity: [number, number]): [boolean, number] => {
  /**
   * [x, y]
   */
  let pos: [number, number] = [0, 0];

  /**
   * [x, y]
   */
  let velocity = JSON.parse(JSON.stringify(initialVelocity));

  let i = 0;

  let maxY = 0;

  let hist: [number, number][] = [];

  hist.push(JSON.parse(JSON.stringify(pos)));

  let hitTarget = false;

  while (true) {
    i++;
    // one step

    pos[0] += velocity[0];

    pos[1] += velocity[1];

    if (velocity[0] > 0) {
      velocity[0]--;
    } else if (velocity[0] < 0) {
      velocity[0]++;
    }

    velocity[1]--;

    maxY = pos[1] > maxY ? pos[1] : maxY;

    // fill hist array with the min and max values

    hist.push(JSON.parse(JSON.stringify(pos)));

    // check if inside target, or missed

    if (
      pos[0] >= targetArea[0][0] &&
      pos[0] <= targetArea[0][1] &&
      pos[1] >= targetArea[1][0] &&
      pos[1] <= targetArea[1][1]
    ) {
      // console.log("Inside target area at", pos);
      // console.log("after", i, "steps");
      // console.log("Initial velocity:", initialVelocity);
      // console.log("max Y:", maxY);

      // console.log({ targetArea });
      // console.log({ hist });

      writeFileSync(
        "./out/part1-render.txt",
        renderTrajectory(hist, targetArea)
      );

      hitTarget = true;

      break;
    } else if (pos[1] < targetArea[1][0]) {
      // console.log("missed");
      // console.log("after", i, "steps");
      // console.log("Initial velocity:", initialVelocity, "\n");

      // pattern

      // renderTrajectory(hist, targetArea);

      break;
    }
  }

  return [hitTarget, maxY ?? 0];
};

console.time("launches");

let i = 1;
let exit = false;
let highestYVal;
while (!exit) {
  let [didExit, maxY] = launchProbe([i, Math.abs(targetArea[1][0]) - 1]);
  exit = didExit;
  highestYVal = maxY;
  i++;
}

console.timeEnd("launches");

console.log("Highest Y Position:", highestYVal);

console.timeEnd("Total Time");

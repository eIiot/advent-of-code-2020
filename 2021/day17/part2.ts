// 0.1%
// 0.2%
// ...
// 99.8%
// 99.9%
// [41.04s] launches
// Number of options: 3186
// [41.05s] Total Time

import { input, examples } from "./input";

console.time("Total Time");

const parseInput = (input: string): [[number, number], [number, number]] => {
  let trimmed = input.substring(13);
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

  console.log(renderArray.map((n) => n.join("")).join("\n"));
};

const launchProbe = (initialVelocity: [number, number]) => {
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

      // renderTrajectory(hist, targetArea);

      // console.log("hit target");
      // console.log("at", initialVelocity);

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

  return hitTarget;
};

let numberOfOptions = 0;

console.time("launches");

for (let x = 0; x < 1000; x++) {
  for (let y = -500; y < 500; y++) {
    // console.log(x, y);
    let hitTarget = launchProbe([x, y]);
    if (hitTarget) {
      numberOfOptions++;
    }
  }
  console.clear();
  console.log(x / 10 + "%");
}

console.timeEnd("launches");

console.log("Number of options:", numberOfOptions);

console.timeEnd("Total Time");

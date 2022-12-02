const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');

var lines = input.split(/\r?\n/);

// parse lines into smaller arrays
lines = lines.map(v => v.split(' -> ').map(v => v.split(',').map(v => parseInt(v))));

function findPoints(point1,point2) {
  var coordinates = [];

  if (point1[0] > point2[0]) {
     [point1, point2] = [point2, point1]
  };

  // find slope

  var m = (point2[1]-point1[1])/(point2[0]-point1[0]);

  // find intercept

  var b = point1[1]-(m*point1[0])

  // for a slope of 0 or Infinity 

  if (Math.abs(m) == Infinity) {
    // reorder with smaller y val first
    if (point1[1] > point2[1]) {
      [point1, point2] = [point2, point1]
    };

    for (let i = point1[1]; i <= point2[1]; i++) {
      coordinates.push([point1[0],i])
    };

    return coordinates;
  };
  
  for (let i = point1[0]; i <= point2[0]; i++) {
    coordinates.push([i,(m*i)+b])
  };

  return coordinates;
};

function createBlankBoard(lines) {
  var finalBoard = [];

  // find max value of coordinates

  let xCoordinates = [];
  let yCoordinates = [];

  for (let i = 0; i < lines.length; i++) {
    const point = lines[i];
    xCoordinates.push(parseInt(point[0][0]));
    xCoordinates.push(parseInt(point[1][0]));
    yCoordinates.push(parseInt(point[0][1]))
    yCoordinates.push(parseInt(point[1][1]))
  };

  // create blank board with x and y coordinates;

  var sampleRow = [];

  for (let i = 0; i <= Math.max.apply(null,yCoordinates); i++) {
    sampleRow[i] = 0;
  };

  for (let i = 0; i <= Math.max.apply(null,xCoordinates); i++) {
    finalBoard[i] = JSON.parse(JSON.stringify(sampleRow));
  };

  return finalBoard;
};

const finalBoard = createBlankBoard(lines);

for (let i = 0; i < lines.length; i++) {
  const inputPoints = lines[i];

  const validPoints = findPoints(inputPoints[0],inputPoints[1]);

  validPoints.forEach(point => {
    finalBoard[point[1]][point[0]]++;
  });
  
};

console.log(finalBoard);

// count overlaps

var overlaps = 0;

finalBoard.flat(Infinity).forEach(point => {
  if (point >= 2) {
    overlaps++;
  };
});

console.log(overlaps);

export {}
debugger;
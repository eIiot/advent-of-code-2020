const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');
input = input.replace(/\r/g, "");

const coordinates = input.split(/\n\n/)[0].split(/\n/).map(c => c.split(',').map(n => parseInt(n)));

const instructions = input.split(/\n\n/)[1].split(/\n/).map(n => n.replace('fold along ','').split('='));

function visualize(coordinates) {
  // VISUALIZE FOR DEBUGGING //

  // find max number for each coordinate
  const coordinateLists = coordinates[0].map((_, colIndex) => coordinates.map(row => row[colIndex]));

  var maxX = coordinateLists[0].reduce(function(a, b) {
    return Math.max(a, b);
  }, 0);

  var maxY = coordinateLists[1].reduce(function(a, b) {
    return Math.max(a, b);
  }, 0);

  // create new array with dimensions maxX,maxY
  const paper = new Array(++maxY).fill('.').map(n => new Array(maxX+1).fill('.'));

  // fill appropriate cells with #
  coordinates.forEach(coord => {
    paper[coord[1]][coord[0]] = '#'
  });

  return paper;
};

var folds = 0;

// for each instruction, flip value without visualising by finding difference
instructions.forEach(instruction => {
  const axis = instruction[0]
  const num = instruction[1]

  folds++;

  for (let i = 0; i < coordinates.length; i++) {
    const coord = coordinates[i];
    
    // move the coordinate using maths!
    if (axis == 'x') {
      if (coord[0] > num) {
        coord[0] -= 2*(coord[0]-num);
      };
    } else if (axis == 'y') {
      if (coord[1] > num) {
        coord[1] -= 2*(coord[1]-num);
      };
    };
  };

  // const paper = visualize(coordinates);

  var uniqCoordinates = coordinates.filter(function(t) {
    var key = t.join('-');
    return this[key] ? false : (this[key] = true);
  }, Object.create(null));

  console.log(`Unique Coordinates after ${folds} folds: ${uniqCoordinates.length}`);
});

export {}
debugger;
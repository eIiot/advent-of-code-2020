const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');
input = input.replace(/\r/g, "");

const cave = input.split(/\n/).map(n => n.split('').map (n => parseInt(n)));

// stolen from the octopuses vv

function getSurroundingCells(x,y,array,previousCells) {
  const modifiers = [
    // [-1,-1],
    [-1,0],
    // [-1,1],
    [0,-1],
    [0,1],
    // [1,-1],
    [1,0],
    // [1,1],        
  ];

  const cells = [];

  // only return if cell exists

  modifiers.forEach(modifier => {
    const xmod = modifier[0];
    const ymod = modifier[1];
    // get surrounding cells, push ones that are not null
    if (!(!array[y+ymod] || !array[y+ymod][x+xmod] || previousCells.includes(`${x+xmod},${y+ymod}`))) {
      cells.push([x+xmod,y+ymod])
    }
  });

  return cells;
};

function main() {

  var lowestSum = Infinity;

  function pathFind(x,y,array,oldSum,oldPreviousCells) {
    var sum = oldSum;

    const previousCells = JSON.parse(JSON.stringify(oldPreviousCells));

    // check if sum is higher than lowest sum 
    if (sum > lowestSum) return;

    if (x == (array[0].length -1) && y == (array.length -1)) {
      lowestSum = sum;
      return;
    };

    sum += array[y][x];

    previousCells.push(`${x},${y}`);

    const surrounding = getSurroundingCells(x,y,array,previousCells);

    surrounding.forEach(cell => {
      pathFind(cell[0],cell[1],array,sum,previousCells);
    });

    // console.log(lowestSum);
  };

  pathFind(0,0,cave,0,[]);
  
  console.log(lowestSum);
};

main();

export {}
debugger;
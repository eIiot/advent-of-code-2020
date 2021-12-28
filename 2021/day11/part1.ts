import { debug } from "console";

const fs = require('fs');

var input = fs.readFileSync('./example2.txt','utf-8');
input = input.replace(/\r/g, "");

var octopuses = input.split(/\n/);

octopuses = octopuses.map(line => line.split('').map(v => Number(v)));

// find surrounding cells

function getSurroundingCells(x,y,array) {
  const modifiers = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1],        
  ];

  const cells = [];

  // only return if cell exists

  modifiers.forEach(modifier => {
    const xmod = modifier[0];
    const ymod = modifier[1];
    // get surrounding cells, push ones that are not null
    if (!(!array[y+ymod] || !array[y+ymod][x+xmod])) {
      cells.push([y+ymod,x+xmod])
    }
  });

  return cells;
}

function flash(x,y,array,flashed) {
  // octopuses can only flash once per step
  if (flashed.includes([x,y].toString())) return;

  flashed.push([x,y].toString());

  // flashing increases the energy of all ajacent octopuses by 1
  const surrounding = getSurroundingCells(x,y,array);

  for (let i  = 0; i < surrounding.length; i++) {
    const x = surrounding[i][0];
    const y = surrounding[i][1];
    
    array[y][x]++;

    if (array[y][x] > 9 && !flashed.includes([x,y].toString())) {
      console.log(`SubFlashing ${[x,y]} with a value of ${array[y][x]++}`)
      flash(x,y,array,flashed);
    };
  };
};

for (let i = 0; i < 100; i++) {

  // increase energy level of every octopus by 1
  octopuses = octopuses.map(row => row.map(cell => ++cell));

  // any octopus with a cell value >9 flashes

  const flashed = [];

  var oldArray = JSON.parse(JSON.stringify(octopuses));

  console.log(oldArray);

  for (let i = 0; i < oldArray.length; i++) {
    var row = oldArray[i];
    for (let j = 0; j < row.length; j++) {
      const octopus = row[j];
      
      if (octopus > 9) {
        console.log(`Flashing ${[j,i]} with a value of ${octopus}`)
        flash(j,i,octopuses,flashed)
      }
    }
  };

  // any octopus that flashed during this step has it's energy set to 0
  flashed.forEach(flash => {
    var cell = flash.split(',');
    octopuses[cell[1]][cell[0]] = 0;
  });


  // what does it look like?
  debugger;

};

export {}
debugger;
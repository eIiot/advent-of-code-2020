const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');
input = input.replace(/\r/g, "");

var heightmap = input.split(/\n/);

heightmap = heightmap.map(line => line.split(""));

function getRelativeCell(x,y,xmod,ymod,array) {
  if (!array[y+ymod] || !array[y+ymod][x+xmod]) {
    console.log('Returning Infinity')
    return Infinity;
  } else {
    return array[y+ymod][x+xmod];
  }
}

// compare surrounding cells, and check if it is lower than all

var riskLevelSum = 0;

for (let i = 0; i < heightmap.length; i++) {
  const row = heightmap[i];
  for (let j = 0; j < row.length; j++) {
    var num = row[j];
    var numUp = getRelativeCell(j,i,0,-1,heightmap);
    var numDown = getRelativeCell(j,i,0,1,heightmap);
    var numLeft = getRelativeCell(j,i,-1,0,heightmap);
    var numRight = getRelativeCell(j,i,1,0,heightmap);

    [num, numUp, numDown, numLeft, numRight] = [num, numUp, numDown, numLeft, numRight].map(v => Number(v));

    if (num < numUp && num < numDown && num < numLeft && num < numRight) {
      riskLevelSum += ++num;
    }
    
  }
}

console.log(riskLevelSum);

export {}
debugger;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var heightmap = input.split(/\n/);
heightmap = heightmap.map(function (line) { return line.split("").map(function (v) { return Number(v); }); });
function getRelativeCell(x, y, xmod, ymod, array) {
    if (array[y + ymod] == undefined || array[y + ymod][x + xmod] == undefined) {
        return [9, [x + xmod, y + ymod]];
    }
    else {
        return [array[y + ymod][x + xmod], [x + xmod, y + ymod]];
    }
}
;
function getSurroundingCells(x, y, array) {
    var cells = [];
    cells.push(getRelativeCell(x, y, 0, -1, array));
    cells.push(getRelativeCell(x, y, 0, 1, array));
    cells.push(getRelativeCell(x, y, -1, 0, array));
    cells.push(getRelativeCell(x, y, 1, 0, array));
    return cells;
}
;
function findBasinCells(x, y, num, array, basinArray) {
    if (num == 9) {
        return;
    }
    else {
        basinArray.push([num, [x, y]]);
        array[y][x] = 9;
        var surroundingCells = getSurroundingCells(x, y, array);
        for (var i = 0; i < surroundingCells.length; i++) {
            // get updated cells to prevent checking the same cell twice
            var updatedCells = getSurroundingCells(x, y, array);
            var cell = updatedCells[i];
            findBasinCells(cell[1][0], cell[1][1], cell[0], array, basinArray);
        }
    }
}
;
var basins = [];
for (var i = 0; i < heightmap.length; i++) {
    var row = heightmap[i];
    for (var j = 0; j < row.length; j++) {
        var cell = row[j];
        if (cell != 9) {
            var basinArray = [];
            findBasinCells(j, i, heightmap[i][j], heightmap, basinArray);
            basins.push(basinArray);
        }
        ;
    }
    ;
}
;
var basinSizes = [];
basins.forEach(function (basin) {
    basinSizes.push(basin.length);
});
// sort array from largest to smallest
basinSizes.sort(function (a, b) {
    return b - a;
});
var answer = basinSizes[0] * basinSizes[1] * basinSizes[2];
console.log(answer);
debugger;
//# sourceMappingURL=part2.js.map
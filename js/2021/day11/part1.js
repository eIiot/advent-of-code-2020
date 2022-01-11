"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./example2.txt', 'utf-8');
input = input.replace(/\r/g, "");
var octopuses = input.split(/\n/);
octopuses = octopuses.map(function (line) { return line.split('').map(function (v) { return Number(v); }); });
// find surrounding cells
function getSurroundingCells(x, y, array) {
    var modifiers = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    var cells = [];
    // only return if cell exists
    modifiers.forEach(function (modifier) {
        var xmod = modifier[0];
        var ymod = modifier[1];
        // get surrounding cells, push ones that are not null
        if (!(!array[y + ymod] || !array[y + ymod][x + xmod])) {
            cells.push([x + xmod, y + ymod]);
        }
    });
    return cells;
}
;
function flash(x, y, array, flashed) {
    // octopuses can only flash once per step
    if (flashed.includes([x, y].toString()))
        return;
    flashed.push([x, y].toString());
    totalFlashes++;
    // flashing increases the energy of all ajacent octopuses by 1
    var surrounding = getSurroundingCells(x, y, array);
    for (var i = 0; i < surrounding.length; i++) {
        var x_1 = surrounding[i][0];
        var y_1 = surrounding[i][1];
        array[y_1][x_1]++;
        if (array[y_1][x_1] > 9) {
            flash(x_1, y_1, array, flashed);
        }
        ;
    }
    ;
}
;
var totalFlashes = 0;
for (var i = 0; i < 195; i++) {
    // increase energy level of every octopus by 1
    octopuses = octopuses.map(function (row) { return row.map(function (cell) { return ++cell; }); });
    // any octopus with a cell value >9 flashes
    var flashed = [];
    for (var i_1 = 0; i_1 < octopuses.length; i_1++) {
        var row = octopuses[i_1];
        for (var j = 0; j < row.length; j++) {
            var octopus = row[j];
            if (octopus > 9) {
                flash(j, i_1, octopuses, flashed);
            }
        }
    }
    ;
    // any octopus that flashed during this step has it's energy set to 0
    flashed.forEach(function (flash) {
        var cell = flash.split(',');
        octopuses[cell[1]][cell[0]] = 0;
    });
}
;
console.log(totalFlashes);
debugger;
//# sourceMappingURL=part1.js.map
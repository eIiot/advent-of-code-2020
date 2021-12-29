"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var coordinates = input.split(/\n\n/)[0].split(/\n/).map(function (c) { return c.split(',').map(function (n) { return parseInt(n); }); });
var instructions = input.split(/\n\n/)[1].split(/\n/).map(function (n) { return n.replace('fold along ', '').split('='); });
function visualize(coordinates) {
    // VISUALIZE FOR DEBUGGING //
    // find max number for each coordinate
    var coordinateLists = coordinates[0].map(function (_, colIndex) { return coordinates.map(function (row) { return row[colIndex]; }); });
    var maxX = coordinateLists[0].reduce(function (a, b) {
        return Math.max(a, b);
    }, 0);
    var maxY = coordinateLists[1].reduce(function (a, b) {
        return Math.max(a, b);
    }, 0);
    // create new array with dimensions maxX,maxY
    var paper = new Array(++maxY).fill('.').map(function (n) { return new Array(maxX + 1).fill('.'); });
    // fill appropriate cells with #
    coordinates.forEach(function (coord) {
        paper[coord[1]][coord[0]] = '#';
    });
    return paper;
}
;
var folds = 0;
// for each instruction, flip value without visualising by finding difference
instructions.forEach(function (instruction) {
    var axis = instruction[0];
    var num = instruction[1];
    folds++;
    for (var i = 0; i < coordinates.length; i++) {
        var coord = coordinates[i];
        // move the coordinate using maths!
        if (axis == 'x') {
            if (coord[0] > num) {
                coord[0] -= 2 * (coord[0] - num);
            }
            ;
        }
        else if (axis == 'y') {
            if (coord[1] > num) {
                coord[1] -= 2 * (coord[1] - num);
            }
            ;
        }
        ;
    }
    ;
    // const paper = visualize(coordinates);
    var uniqCoordinates = coordinates.filter(function (t) {
        var key = t.join('-');
        return this[key] ? false : (this[key] = true);
    }, Object.create(null));
    console.log("Unique Coordinates after ".concat(folds, " folds: ").concat(uniqCoordinates.length));
});
debugger;
//# sourceMappingURL=part1.js.map
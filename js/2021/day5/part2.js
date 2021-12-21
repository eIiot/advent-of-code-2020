"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
var lines = input.split(/\r?\n/);
// parse lines into smaller arrays
lines = lines.map(function (v) { return v.split(' -> ').map(function (v) { return v.split(',').map(function (v) { return parseInt(v); }); }); });
function findPoints(point1, point2) {
    var _a, _b;
    var coordinates = [];
    if (point1[0] > point2[0]) {
        _a = [point2, point1], point1 = _a[0], point2 = _a[1];
    }
    ;
    // find slope
    var m = (point2[1] - point1[1]) / (point2[0] - point1[0]);
    // find intercept
    var b = point1[1] - (m * point1[0]);
    // for a slope of 0 or Infinity 
    if (Math.abs(m) == Infinity) {
        // reorder with smaller y val first
        if (point1[1] > point2[1]) {
            _b = [point2, point1], point1 = _b[0], point2 = _b[1];
        }
        ;
        for (var i = point1[1]; i <= point2[1]; i++) {
            coordinates.push([point1[0], i]);
        }
        ;
        return coordinates;
    }
    ;
    for (var i = point1[0]; i <= point2[0]; i++) {
        coordinates.push([i, (m * i) + b]);
    }
    ;
    return coordinates;
}
;
function createBlankBoard(lines) {
    var finalBoard = [];
    // find max value of coordinates
    var xCoordinates = [];
    var yCoordinates = [];
    for (var i = 0; i < lines.length; i++) {
        var point = lines[i];
        xCoordinates.push(parseInt(point[0][0]));
        xCoordinates.push(parseInt(point[1][0]));
        yCoordinates.push(parseInt(point[0][1]));
        yCoordinates.push(parseInt(point[1][1]));
    }
    ;
    // create blank board with x and y coordinates;
    var sampleRow = [];
    for (var i = 0; i <= Math.max.apply(null, yCoordinates); i++) {
        sampleRow[i] = 0;
    }
    ;
    for (var i = 0; i <= Math.max.apply(null, xCoordinates); i++) {
        finalBoard[i] = JSON.parse(JSON.stringify(sampleRow));
    }
    ;
    return finalBoard;
}
;
var finalBoard = createBlankBoard(lines);
for (var i = 0; i < lines.length; i++) {
    var inputPoints = lines[i];
    var validPoints = findPoints(inputPoints[0], inputPoints[1]);
    validPoints.forEach(function (point) {
        finalBoard[point[1]][point[0]]++;
    });
}
;
console.log(finalBoard);
// count overlaps
var overlaps = 0;
finalBoard.flat(Infinity).forEach(function (point) {
    if (point >= 2) {
        overlaps++;
    }
    ;
});
console.log(overlaps);
debugger;
//# sourceMappingURL=part2.js.map
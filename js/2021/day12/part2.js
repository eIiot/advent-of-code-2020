"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var map = input.split(/\n/);
map = map.map(function (n) { return n.split('-'); });
// create an array with all points on map, with the connections
var mapObject = {};
// create DB with objects and cooresponding children
map.forEach(function (item) {
    var start = item[0];
    var end = item[1];
    mapObject[start] = mapObject[start] || [];
    mapObject[end] = mapObject[end] || [];
    mapObject[start].push(end);
    mapObject[end].push(start);
});
// count number of times value appears in array
function getOccurrence(array, value) {
    var count = 0;
    array.forEach(function (v) { return (v === value && count++); });
    return count;
}
var paths = [];
// function that visits every child, if that child hasn't been visited before
function findPath(cave, oldAlreadySearched, doubleSmallCave, mapObject, foundPaths) {
    var alreadySearched = JSON.parse(JSON.stringify(oldAlreadySearched));
    if (cave == "end") { // at the end of the cave, finish the route
        alreadySearched.push(cave);
        foundPaths.push(alreadySearched);
        return;
    }
    else if (cave == "start") { // don't revisit the start
        return;
    }
    else if (cave == cave.toLowerCase() && getOccurrence(alreadySearched, cave) > 1) { // visit one small cave twice, all others once
        return;
    }
    else if (cave == cave.toLowerCase() && cave != doubleSmallCave && doubleSmallCave != null && alreadySearched.includes(cave)) {
        return;
    }
    ;
    alreadySearched.push(cave);
    if (cave == cave.toLowerCase() && getOccurrence(alreadySearched, cave) > 1) {
        doubleSmallCave = cave;
    }
    ;
    mapObject[cave].forEach(function (child) {
        findPath(child, alreadySearched, doubleSmallCave, mapObject, foundPaths);
    });
}
;
// start search at start
mapObject['start'].forEach(function (child) {
    findPath(child, ['start'], null, mapObject, paths);
});
console.log(paths);
debugger;
//# sourceMappingURL=part2.js.map
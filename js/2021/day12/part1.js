"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf-8');
input = input.replace(/\r/g, "");
var map = input.split(/\n/);
map = map.map(n => n.split('-'));
// create an array with all points on map, with the connections
const mapObject = {};
// create DB with objects and cooresponding children
map.forEach(item => {
    var start = item[0];
    var end = item[1];
    mapObject[start] = mapObject[start] || [];
    mapObject[end] = mapObject[end] || [];
    mapObject[start].push(end);
    mapObject[end].push(start);
});
const paths = [];
// function that visits every child, if that child hasn't been visited before
function findPath(cave, oldAlreadySearched, mapObject, foundPaths) {
    var alreadySearched = JSON.parse(JSON.stringify(oldAlreadySearched));
    if (cave == "end") { // at the end of the cave, finish the route
        foundPaths.push(alreadySearched);
        return;
    }
    else if (cave == "start") { // don't revisit the start
        return;
    }
    else if (cave == cave.toLowerCase() && alreadySearched.includes(cave)) { // can't visit small caves more than once
        return;
    }
    ;
    alreadySearched.push(cave);
    mapObject[cave].forEach(child => {
        findPath(child, alreadySearched, mapObject, foundPaths);
    });
}
;
// start search at start
mapObject['start'].forEach(child => {
    findPath(child, ['start'], mapObject, paths);
});
console.log(paths);
debugger;
//# sourceMappingURL=part1.js.map
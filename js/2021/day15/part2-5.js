"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const PriorityQueue_1 = require("./PriorityQueue");
const Graph_1 = require("./Graph");
const smallCave = input_1.default.split(/\n/).map((n) => n.split("").map((n) => +n));
const fiveWide = [];
const rollOver = (v, increment) => {
    return v + increment > 9 ? (v + increment) % 9 : v + increment;
};
// this is a really dumb way to implement this, but I'm lazy
smallCave.forEach((line) => {
    const newLine = [
        ...line.map((v) => rollOver(v, 0)),
        ...line.map((v) => rollOver(v, 1)),
        ...line.map((v) => rollOver(v, 2)),
        ...line.map((v) => rollOver(v, 3)),
        ...line.map((v) => rollOver(v, 4)),
    ];
    fiveWide.push(newLine);
});
const cave = [
    ...fiveWide.map((line) => line.map((v) => rollOver(v, 0))),
    ...fiveWide.map((line) => line.map((v) => rollOver(v, 1))),
    ...fiveWide.map((line) => line.map((v) => rollOver(v, 2))),
    ...fiveWide.map((line) => line.map((v) => rollOver(v, 3))),
    ...fiveWide.map((line) => line.map((v) => rollOver(v, 4))),
];
console.time("Graph Creation");
const surroundingCells = (array, i, j) => {
    return [
        [array[i - 1] ? array[i - 1][j] : undefined, i - 1, j],
        [array[i + 1] ? array[i + 1][j] : undefined, i + 1, j],
        [array[i][j - 1], i, j - 1],
        [array[i][j + 1], i, j + 1],
    ];
};
const caveGraph = new Graph_1.default();
cave.forEach((row, i) => {
    row.forEach((cell, j) => {
        const edges = surroundingCells(cave, i, j);
        edges.forEach((edge) => {
            if (edge[0]) {
                caveGraph.addEdge([i, j].join(","), [edge[1], edge[2]].join(","), edge[0]);
            }
        });
    });
});
console.timeEnd("Graph Creation");
console.time("Dijkstra");
const dijkstra = (graph, source) => {
    const dist = []; // best distances to grid
    const prev = [];
    const prevNodes = new Set();
    dist[source] = 0; // set the source distance to 0
    const pq = new PriorityQueue_1.default(); // create a min priority queue
    graph.vertices.forEach((v) => {
        // initialize priority queue with Infinity as the distance from the source for every vertex
        if (v !== source) {
            dist[v] = Infinity;
            prev[v] = undefined;
        }
        pq.enqueue(v, dist[v]);
    });
    console.log("hello");
    const fixedIncList = JSON.parse(JSON.stringify(graph.incidenceList)); // need to implement this in my PriorityQueueClass
    while (!pq.isEmpty) {
        let [v] = pq.dequeue(); // find the best vertex
        prevNodes.add(v);
        fixedIncList[v].forEach((neighbor) => {
            // for each neighbor of the best vertex
            const [n, nDist] = neighbor; // neighbor value and distance from the best vertex
            let alt = dist[v] + nDist; // get the new distance from the start
            if (alt < dist[n] && dist[v] !== Infinity && !prevNodes.has(n)) {
                // check if the new distance is less than the current best distance to the neighbor value
                dist[n] = alt; // set the best distance to the new distance
                prev[n] = v;
                pq.enqueue(n, alt); // set the neighbor value distance to the new distance in the graph
            }
        });
    }
    return [dist, prev];
};
const [dist, prev] = dijkstra(caveGraph, "0,0");
const risk = dist[[cave.length - 1, cave[0].length - 1].join(",")];
console.timeEnd("Dijkstra");
console.log("Lowest Total Risk:", risk);
debugger;
//# sourceMappingURL=part2-5.js.map
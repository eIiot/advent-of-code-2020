"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example = require("./example");
const PriorityQueue_1 = require("./PriorityQueue");
const Graph_1 = require("./Graph");
const cave = example.two.split(/\n/).map((n) => n.split("").map((n) => +n));
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
const makePoint = (i, j) => {
    return [i, j].join(",");
};
cave.forEach((row, i) => {
    row.forEach((cell, j) => {
        const edges = surroundingCells(cave, i, j);
        edges.forEach((edge) => {
            if (edge[0]) {
                caveGraph.addEdge(makePoint(i, j), makePoint(edge[1], edge[2]), edge[0]);
            }
        });
    });
});
console.timeEnd("Graph Creation");
console.time("Dijkstra");
const hFunc = (node, goal) => {
    const [i, j] = node.split(",").map((a) => +a);
    const [goalI, goalJ] = goal.split(",").map((a) => +a);
    return Math.sqrt((goalI - i) ** 2 + (goalJ - j) ** 2) * 2;
};
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
    while (!pq.isEmpty) {
        let [u] = pq.dequeue(); // find the best vertex
        if (prevNodes.has(u))
            continue;
        prevNodes.add(u);
        graph.incidenceList[u].forEach((neighbor) => {
            // for each neighbor of the best vertex
            const [v, vDist] = neighbor; // neighbor value and distance from the best vertex
            let alt = dist[u] + vDist;
            if (alt < dist[v] && dist[u] !== Infinity) {
                // check if the new distance is less than the current best distance to the neighbor value
                dist[v] = alt; // set the best distance to the new distance
                prev[v] = u;
                pq.enqueue(v, alt); // set the neighbor value distance to the new distance in the graph
            }
        });
    }
    return [dist, prev];
};
const [dist, prev] = dijkstra(caveGraph, "0,0");
const risk = dist[makePoint(cave.length - 1, cave[0].length - 1)];
console.timeEnd("Dijkstra");
console.log("Lowest Total Risk:", risk);
debugger;
//# sourceMappingURL=part1.js.map
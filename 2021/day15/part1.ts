import * as fs from "fs";
import input from "./input";
import * as example from "./example";
import PriorityQueue from "./tools/PriorityQueue";
import Graph from "./tools/Graph";

const cave = input.split(/\n/).map((n) => n.split("").map((n) => +n));

console.time("Graph Creation");

const surroundingCells = (
  array: Array<Array<number>>,
  i: number,
  j: number
) => {
  return [
    [array[i - 1] ? array[i - 1][j] : undefined, i - 1, j],
    [array[i + 1] ? array[i + 1][j] : undefined, i + 1, j],
    [array[i][j - 1], i, j - 1],
    [array[i][j + 1], i, j + 1],
  ];
};

const caveGraph = new Graph();

cave.forEach((row, i) => {
  row.forEach((cell, j) => {
    const edges = surroundingCells(cave, i, j);

    edges.forEach((edge) => {
      if (edge[0]) {
        caveGraph.addEdge(
          [i, j].join(","),
          [edge[1], edge[2]].join(","),
          edge[0]
        );
      }
    });
  });
});

console.timeEnd("Graph Creation");

console.time("Dijkstra");

const dijkstra = (graph: Graph, source: string) => {
  const dist = []; // best distances to grid
  const prev = [];
  const prevNodes = new Set<string>();

  dist[source] = 0; // set the source distance to 0

  const pq = new PriorityQueue(); // create a min priority queue

  graph.vertices.forEach((v) => {
    // initialize priority queue with Infinity as the distance from the source for every vertex
    if (v !== source) {
      dist[v] = Infinity;
      prev[v] = undefined;
    }

    pq.enqueue(v, dist[v]);
  });

  while (!pq.isEmpty) {
    let [v] = pq.dequeue(); // find the best vertex

    prevNodes.add(v);

    graph.incidenceList[v].forEach((neighbor) => {
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

// Graph Creation: 19.301025390625 ms
// Graph Creation: 19.383ms
// Dijkstra: 27206.989990234375 ms
// Dijkstra: 27.206s
// Lowest Total Risk: 604

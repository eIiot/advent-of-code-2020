import * as fs from "fs";
import input from "./input";
import * as example from "./example";
import PriorityQueue from "./tools/PriorityQueue";
import Graph from "./tools/Graph";

const smallCave = input.split(/\n/).map((n) => n.split("").map((n) => +n));

const fiveWide = [];

const rollOver = (v: number, increment: number) => {
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

console.time("A*");

// for part 2, the array was too big, so Dijkstra took too long to enqueue all the elements (because creating an element requires it to search the entire array in the queue, something I should probably fix). I ended up using a version of A* instead, which was much faster

const aStar = (graph: Graph, start: string, goal: string) => {
  const open = new PriorityQueue();
  const closed = new Set<string>();

  const fixedIncList = JSON.parse(JSON.stringify(graph.incidenceList)); // need to implement this in my PriorityQueueClass

  open.enqueue(start, 0);

  while (true) {
    let currentNode = open.dequeue();

    if (currentNode[0] === goal) {
      return currentNode;
    }

    for (let i = 0; i < fixedIncList[currentNode[0]].length; i++) {
      const neighbor = fixedIncList[currentNode[0]][i];
      if (closed.has(neighbor[0])) {
        continue;
      }

      const cost = currentNode[1] + neighbor[1];

      open.enqueue(neighbor[0], cost);

      closed.add(neighbor[0]);
    }
  }
};

const risk = aStar(
  caveGraph,
  "0,0",
  [cave.length - 1, cave[0].length - 1].join(",")
)[1];

console.timeEnd("A*");

console.log("Lowest Total Risk:", risk);

debugger;

// Graph Creation: 455.845947265625 ms
// Graph Creation: 455.937ms
// A*: 1166.2109375 ms
// A*: 1.166s
// Lowest Total Risk: 2907

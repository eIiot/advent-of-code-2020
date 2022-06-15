export default class Graph {
  #vertices = new Set<string>();
  #incidenceList = new Map();

  get vertices() {
    return Array.from(this.#vertices);
  }

  get incidenceList() {
    const list = {};

    this.#incidenceList.forEach((val: Map<any, number>, key) => {
      list[key] = Array.from(val);
    });

    return list;
  }

  addVertex(vertex: string | null = null) {
    if (!this.#vertices.has(vertex) && vertex !== null) {
      this.#vertices.add(vertex);
      this.#incidenceList.set(vertex, new Map());
    }
  }

  addEdge(vertex1: string | null, vertex2: string | null, weight: number) {
    if (vertex1 !== null && vertex2 !== null && vertex1 != vertex2) {
      this.addVertex(vertex1);
      this.addVertex(vertex2);

      this.#incidenceList.get(vertex1).set(vertex2, weight);
    }
  }
}

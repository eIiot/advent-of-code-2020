export default class Graph {
  #vertices = new Set<string>();
  #incidenceList = new Map();

  #changes = 0;
  #cachedChanges = -1;

  #cachedIncidenceList = ``;

  get vertices() {
    return Array.from(this.#vertices);
  }

  get incidenceList() {
    const list = {};

    if (this.#changes == this.#cachedChanges) {
      return JSON.parse(this.#cachedIncidenceList);
    }

    this.#incidenceList.forEach((val: Map<any, number>, key) => {
      list[key] = Array.from(val);
    });

    this.#cachedIncidenceList = JSON.stringify(list);
    this.#cachedChanges = this.#changes;

    return list;
  }

  addVertex(vertex: string | null = null) {
    if (!this.#vertices.has(vertex) && vertex !== null) {
      this.#vertices.add(vertex);
      this.#incidenceList.set(vertex, new Map());

      this.#changes++;
    }
  }

  addEdge(vertex1: string | null, vertex2: string | null, weight: number) {
    if (vertex1 !== null && vertex2 !== null && vertex1 != vertex2) {
      this.addVertex(vertex1);
      this.addVertex(vertex2);

      this.#incidenceList.get(vertex1).set(vertex2, weight);

      this.#changes++;
    }
  }
}

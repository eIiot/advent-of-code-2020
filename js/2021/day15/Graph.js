"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Graph_vertices, _Graph_incidenceList;
Object.defineProperty(exports, "__esModule", { value: true });
class Graph {
    constructor() {
        _Graph_vertices.set(this, new Set());
        _Graph_incidenceList.set(this, new Map());
    }
    get vertices() {
        return Array.from(__classPrivateFieldGet(this, _Graph_vertices, "f"));
    }
    get incidenceList() {
        const list = {};
        __classPrivateFieldGet(this, _Graph_incidenceList, "f").forEach((val, key) => {
            list[key] = Array.from(val);
        });
        return list;
    }
    addVertex(vertex = null) {
        if (!__classPrivateFieldGet(this, _Graph_vertices, "f").has(vertex) && vertex !== null) {
            __classPrivateFieldGet(this, _Graph_vertices, "f").add(vertex);
            __classPrivateFieldGet(this, _Graph_incidenceList, "f").set(vertex, new Map());
        }
    }
    addEdge(vertex1, vertex2, weight) {
        if (vertex1 !== null && vertex2 !== null && vertex1 != vertex2) {
            this.addVertex(vertex1);
            this.addVertex(vertex2);
            __classPrivateFieldGet(this, _Graph_incidenceList, "f").get(vertex1).set(vertex2, weight);
            __classPrivateFieldGet(this, _Graph_incidenceList, "f").get(vertex2).set(vertex1, weight);
        }
    }
}
exports.default = Graph;
_Graph_vertices = new WeakMap(), _Graph_incidenceList = new WeakMap();
//# sourceMappingURL=Graph.js.map
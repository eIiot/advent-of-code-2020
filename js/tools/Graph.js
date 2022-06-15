"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Graph_vertices, _Graph_incidenceList, _Graph_changes, _Graph_cachedChanges, _Graph_cachedIncidenceList;
Object.defineProperty(exports, "__esModule", { value: true });
class Graph {
    constructor() {
        _Graph_vertices.set(this, new Set());
        _Graph_incidenceList.set(this, new Map());
        _Graph_changes.set(this, 0);
        _Graph_cachedChanges.set(this, -1);
        _Graph_cachedIncidenceList.set(this, ``);
    }
    get vertices() {
        return Array.from(__classPrivateFieldGet(this, _Graph_vertices, "f"));
    }
    get incidenceList() {
        const list = {};
        if (__classPrivateFieldGet(this, _Graph_changes, "f") == __classPrivateFieldGet(this, _Graph_cachedChanges, "f")) {
            return JSON.parse(__classPrivateFieldGet(this, _Graph_cachedIncidenceList, "f"));
        }
        __classPrivateFieldGet(this, _Graph_incidenceList, "f").forEach((val, key) => {
            list[key] = Array.from(val);
        });
        __classPrivateFieldSet(this, _Graph_cachedIncidenceList, JSON.stringify(list), "f");
        __classPrivateFieldSet(this, _Graph_cachedChanges, __classPrivateFieldGet(this, _Graph_changes, "f"), "f");
        return list;
    }
    addVertex(vertex = null) {
        var _a;
        if (!__classPrivateFieldGet(this, _Graph_vertices, "f").has(vertex) && vertex !== null) {
            __classPrivateFieldGet(this, _Graph_vertices, "f").add(vertex);
            __classPrivateFieldGet(this, _Graph_incidenceList, "f").set(vertex, new Map());
            __classPrivateFieldSet(this, _Graph_changes, (_a = __classPrivateFieldGet(this, _Graph_changes, "f"), _a++, _a), "f");
        }
    }
    addEdge(vertex1, vertex2, weight) {
        var _a;
        if (vertex1 !== null && vertex2 !== null && vertex1 != vertex2) {
            this.addVertex(vertex1);
            this.addVertex(vertex2);
            __classPrivateFieldGet(this, _Graph_incidenceList, "f").get(vertex1).set(vertex2, weight);
            __classPrivateFieldSet(this, _Graph_changes, (_a = __classPrivateFieldGet(this, _Graph_changes, "f"), _a++, _a), "f");
        }
    }
}
exports.default = Graph;
_Graph_vertices = new WeakMap(), _Graph_incidenceList = new WeakMap(), _Graph_changes = new WeakMap(), _Graph_cachedChanges = new WeakMap(), _Graph_cachedIncidenceList = new WeakMap();
//# sourceMappingURL=Graph.js.map
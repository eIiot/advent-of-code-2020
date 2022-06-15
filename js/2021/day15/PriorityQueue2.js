"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PriorityQueue {
    constructor() {
        this.list = [];
    }
    enqueue(name, val) {
        const item = [name, val];
        if (this.isEmpty) {
            this.list.push(item);
        }
        else {
            let added = false;
            for (let i = 0; i < this.list.length; i++) {
                const element = this.list[i];
                if (item[1] < element[1]) {
                    this.list.splice(i, 0, item);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.list.push(item);
            }
        }
    }
    dequeue() {
        const item = this.list.shift();
        return item;
    }
    get size() {
        return this.list.length;
    }
    get front() {
        return this.list[0];
    }
    get isEmpty() {
        return this.list.length === 0;
    }
}
exports.default = PriorityQueue;
//# sourceMappingURL=PriorityQueue2.js.map
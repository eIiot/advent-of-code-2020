export default class PriorityQueue {
  list: [string, number][] = [];

  enqueue(name: string, val: number) {
    const item = [name, val] as [string, number];
    if (this.isEmpty) {
      this.list.push(item);
    } else {
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

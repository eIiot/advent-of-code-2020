import { examples } from './input';

let input = examples[0].split('');

class Pairs {
  i = 0;
  arr: any;

  constructor(arr) {
    this.arr = arr;
  }

  get() {
    return this.arr[this.i];
  }

  nextChar() {
    this.i++;
    return this.get();
  }

  previousChar() {
    this.i--;
    return this.get();
  }

  addNextNum(n) {
    let nextIndex = this.arr.findIndexOf((n, j) => +n && j > this.i);
    this.i = nextIndex;
    return this.get();     
  }

  addPrevNum(n) {
    let prevIndex = this.arr.findLastIndexOf((n, j) => +n && j < this.i);
    this.i = prevIndex;
    return this.get();
  }
}

let pairs = new Pairs(input);

console.log(input)
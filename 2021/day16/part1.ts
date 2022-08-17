// switched to bun.sh -- compile times may vary

import { input, examples } from "./input";

const hex2bin = (data: string) =>
  data
    .split("")
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");

let sum = 0;

class BitStack {
  stack: string[];

  constructor(hex: string) {
    let bin = hex2bin(hex);

    this.stack = bin.split("");
  }

  /**
   * @returns the first element from the stack, and removes that element from the stack
   */
  pop() {
    return this.stack.shift();
  }

  /**
   * @param  {number} num the number of elements that should be returned, and removed
   *
   * @returns the first `num` elements from the stack, and removes those elements from the stack
   */
  grab(num: number) {
    return this.stack.splice(0, num);
  }

  /**
   * @returns the first element from the stack,
   */
  peek() {
    return this.stack[0];
  }

  /**
   * @param  {number} num the number of elements that should be returned
   *
   * @returns the first `num` elements from the stack
   */
  look(num: number) {
    return this.stack.slice(0, num);
  }

  /**
   * @returns the length of the stack
   */
  get length() {
    return this.stack.length;
  }
}

const parseLiteral = async (stack: BitStack) => {
  let spVersion = parseInt(stack.grab(3).join(""), 2);

  let spTypeId = parseInt(stack.grab(3).join(""), 2);

  sum += spVersion;

  let endFound = false;

  let bitNumber = "";

  while (!endFound) {
    let nextFiveBits = stack.grab(5);

    let customBitType = nextFiveBits.splice(0, 1);

    bitNumber += nextFiveBits.join("");

    if (customBitType[0] === "0") {
      endFound = true;
    }
  }

  return;
};

const parseOperator = async (stack: BitStack) => {
  let version = parseInt(stack.grab(3).join(""), 2);

  sum += version;

  let typeId = parseInt(stack.grab(3).join(""), 2); // we don't care about typeId

  let lengthTypeId = stack.pop();

  if (lengthTypeId === "0") {
    let length = parseInt(stack.grab(15).join(""), 2);

    let lengthParsed = 0;

    while (lengthParsed < length) {
      let spHeader = stack.look(6);

      let spTypeId = parseInt(spHeader.splice(3, 3).join(""), 2);

      let currentStackLength = stack.length;

      if (spTypeId === 4) {
        await parseLiteral(stack);
      } else {
        await parseOperator(stack);
      }

      lengthParsed += currentStackLength - stack.length;
    }
    return;
  } else {
    let numberOfSubPackets = parseInt(stack.grab(11).join(""), 2);

    let parsedSubPackets = 0;

    while (parsedSubPackets < numberOfSubPackets) {
      let spHeader = stack.look(6);

      let spTypeId = parseInt(spHeader.splice(3, 3).join(""), 2);

      if (spTypeId === 4) {
        await parseLiteral(stack);
      } else {
        await parseOperator(stack);
      }

      parsedSubPackets++;
    }
    return;
  }
};

console.time("Stack Creation");

let stack = new BitStack(input);

console.timeEnd("Stack Creation");

console.time("Parsing");

await parseOperator(stack);

console.timeEnd("Parsing");

console.log("Sum of Version Numbers:", sum);

// [2.73ms] Stack Creation
// [4.39ms] Parsing
// Final Value: 1495959086337
// [8.17ms] Total Time

import { input, examples } from "./input";

console.time("Total Time");

const hex2bin = (data: string) =>
  data
    .split("")
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");

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

  return parseInt(bitNumber, 2);
};

const parseOperator = async (stack: BitStack): Promise<number> => {
  let version = parseInt(stack.grab(3).join(""), 2);

  let value: number;

  let subPacketValues: number[] = [];

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
        let val = await parseLiteral(stack);
        subPacketValues.push(val);
      } else {
        let val = await parseOperator(stack);
        subPacketValues.push(val);
      }

      lengthParsed += currentStackLength - stack.length;
    }
  } else {
    let numberOfSubPackets = parseInt(stack.grab(11).join(""), 2);

    let parsedSubPackets = 0;

    while (parsedSubPackets < numberOfSubPackets) {
      let spHeader = stack.look(6);

      let spTypeId = parseInt(spHeader.splice(3, 3).join(""), 2);

      if (spTypeId === 4) {
        let val = await parseLiteral(stack);
        subPacketValues.push(val);
      } else {
        let val = await parseOperator(stack);
        subPacketValues.push(val);
      }

      parsedSubPackets++;
    }
  }

  // do opreations on subpackets

  if (typeId === 0) {
    value = subPacketValues.reduce((a, b) => a + b);
  } else if (typeId === 1) {
    value = subPacketValues.reduce((a, b) => a * b);
  } else if (typeId === 2) {
    value = Math.min(...subPacketValues);
  } else if (typeId === 3) {
    value = Math.max(...subPacketValues);
  } else if (typeId === 5) {
    value = subPacketValues[0] > subPacketValues[1] ? 1 : 0;
  } else if (typeId === 6) {
    value = subPacketValues[0] < subPacketValues[1] ? 1 : 0;
  } else if (typeId === 7) {
    value = subPacketValues[0] === subPacketValues[1] ? 1 : 0;
  }

  return value;
};

console.time("Stack Creation");

let stack = new BitStack(input);

console.timeEnd("Stack Creation");

console.time("Parsing");

let value = await parseOperator(stack);

console.timeEnd("Parsing");

console.log("Final Value:", value);

console.timeEnd("Total Time");

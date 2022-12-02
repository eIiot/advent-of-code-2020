type splitter = { [Symbol.split](string: string, limit?: number): string[] };

export const init2dArr = (lines: string, split1: splitter, split2: splitter) =>
  lines.split(split1).map((v) => v.split(split2));

export const identity = (a) => a;

export const linesToNumbers = (lines: string) =>
  lines.split("\n").map((n) => +n);

export const arrEqual = (arr1: number[], arr2: number[]) => {
  if (arr1 === arr2) return true;
  if (arr1 == null || arr2 == null) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sum = (arr: any[]) => {
  return arr.filter(Number.isFinite).reduce((a, b) => a + b, 0);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const product = (arr: any[]) => {
  return arr.filter(Number.isFinite).reduce((a, b) => a * b, 1);
};

// more here

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const splitAt = (i: number, arr: any[]) => {
  return [arr.slice(0, i), arr.slice(i)];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rotateArr = (arr: any[], n = 1) => {
  const m = n % arr.length;
  return arr.slice(-m, arr.length).concat(arr.slice(0, -m));
};

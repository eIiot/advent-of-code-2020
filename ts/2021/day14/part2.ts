const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');
input = input.replace(/\r/g, "");

var template = input.split(/\n\n/)[0];

const rulesArr = input.split(/\n\n/)[1].split(/\n/).map(n => n.split(' -> '));

function arr2obj(arr) {
  
  // Create an empty object
  let obj = {};

  arr.forEach((v) => {

      // Extract the key and the value
      let key = v[0];
      let value = v[1];

      // Add the key and value to
      // the object
      obj[key] = value;
  });

  // Return the object
  return obj;
};

const rules = arr2obj(rulesArr);

// generate pair -> pair1 pair2

const pairRules = {};

for (const pair in rules) {
  if (Object.prototype.hasOwnProperty.call(rules, pair)) {
    const rule = rules[pair];
    const pairArray = pair.split('');
    pairRules[pair] = [pairArray[0] + rule,rule + pairArray[1]];
  }
}

const pairCounts = {};

for (let j = 1; j < template.length; j++) {
  const letter = template[j];
  const previousLetter = template[j-1];

  const pair = previousLetter+letter;

  pairCounts[pair] = pairCounts[pair] || 0;

  pairCounts[pair]++;
};

for (let i = 0; i < 40; i++) {
  var oldPairCounts = JSON.parse(JSON.stringify(pairCounts));

  for (const pair in pairCounts) {
    if (Object.prototype.hasOwnProperty.call(pairCounts, pair)) {
      var count = oldPairCounts[pair];

      // add the appropriate pairs to the count, and remove the old pair
      for (let i = 0; i < pairRules[pair].length; i++) {
        const rulePair = pairRules[pair][i];

        pairCounts[rulePair] = pairCounts[rulePair] || 0;

        pairCounts[rulePair]+= count;
      };

      pairCounts[pair]-= count;

      if (pairCounts[pair] == 0) delete pairCounts[pair];
    };
  };
};

// find number of each letter

const charCounts = {};

for (const pair in pairCounts) {
  if (Object.prototype.hasOwnProperty.call(pairCounts, pair)) {
    const count = pairCounts[pair];
    charCounts[pair.charAt(0)] = charCounts[pair.charAt(0)] || 0;

    charCounts[pair.charAt(0)]+= count;
  };
};

// account for last char in array

charCounts[template.charAt(template.length-1)]++;

var smallest = Infinity;
var largest = 0;

for (const letter in charCounts) {
  if (Object.prototype.hasOwnProperty.call(charCounts, letter)) {
    const num = charCounts[letter];
    if (num > largest) largest = num;
    if (num < smallest) smallest = num;
  }
};

var answer = largest-smallest;

console.log(`Answer: ${answer}`);

export {};
debugger;

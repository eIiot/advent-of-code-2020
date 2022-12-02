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

for (let i = 0; i < 40; i++) {
  console.log(i);
  const newTemplate = template.split('');
  var numberOfInserts = 0;
  for (let j = 1; j < template.length; j++) {
    if (j % 1000 == 0) console.log(j)

    const letter = template[j];
    const previousLetter = template[j-1];
    
    const string = previousLetter+letter;

    if (rules[string] != undefined) {
      newTemplate.splice(j+numberOfInserts, 0, rules[string]);
      numberOfInserts++;
    };
  };

  template = newTemplate.join('')
};

// count number of times each character appears in the string
var templateArray = template.split('');
templateArray.sort();

const letterOccurances = {};

for (let i = 1; i <= templateArray.length; i++) {
  const letter = templateArray[i];
  const lastLetter = templateArray[i-1];
  // if last letter was different, log the last letter and the i val
  if (letter != lastLetter) {
    console.log(`${lastLetter} occurs ${i} times`);
    // remove all of the last letter from the array
    templateArray.splice(0,i);
    letterOccurances[lastLetter] = i;
    i = 0;
  }
};

var smallest = Infinity;
var largest = 0;

for (const letter in letterOccurances) {
  if (Object.prototype.hasOwnProperty.call(letterOccurances, letter)) {
    const num = letterOccurances[letter];
    if (num > largest) largest = num;
    if (num < smallest) smallest = num;
  }
};

var answer = largest-smallest;

console.log(`Answer: ${answer}`);

export {}
debugger;
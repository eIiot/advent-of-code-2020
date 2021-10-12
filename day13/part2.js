var input = `1006697
13,x,x,41,x,x,x,x,x,x,x,x,x,641,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,661,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23`;

var testInput = `939
7,13,x,x,59,x,31,19`;

input = testInput;

var lines = input.split('\n');

var originalTimestamp = lines[0];
var busses = lines[1].split(',');

for (let i = 0; i < busses.length; i++) {
  const bus = busses[i];
  if (bus === 'x') {
    busses[i] = 1;
  } else {
    busses[i] = parseInt(bus);
  }
};

var foundBusses = false;

var timestamp = originalTimestamp;
// var timestamp = 100000000000000;

// iterate through timestamps;
while (!foundBusses) {
  var noOfBusses = 0;

  // iterate through busses, and check every next item
  for (let i = 0; i < busses.length; i++) {
    const bus = busses[i];
    
    if ((timestamp+i) % bus == 0) {
      noOfBusses++;
    } else {
      break;
    };
  };

  if (noOfBusses === busses.length) {
    console.log(timestamp);
    foundBusses = true;
  };
  timestamp++;
};

debugger;
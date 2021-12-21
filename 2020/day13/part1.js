var input = `1006697
13,x,x,41,x,x,x,x,x,x,x,x,x,641,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,661,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23`;

var testInput = `939
7,13,x,x,59,x,31,19`;

input = testInput;

var lines = input.split('\n');

var originalTimestamp = lines[0];
var busses = lines[1].split(',');

var foundBus = false;

var timestamp = originalTimestamp;

while (!foundBus) {
  for (let i = 0; i < busses.length; i++) {
    const bus = busses[i];
    
    if (bus !== 'x' && timestamp % bus == 0) {
      foundBus = true;
      var answer = (timestamp-originalTimestamp) * bus;
      console.log({originalTimestamp,timestamp,bus});
      console.log(`Answer: ${answer}`)
    };
  };
  timestamp++;
};

debugger;
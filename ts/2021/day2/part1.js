const fs = require('fs');

var input = fs.readFileSync('./input.txt','utf-8');

const commandsUnparsed = input.split(/\r?\n/);

// split every item in the array by ' '
const commands = commandsUnparsed.map(command => command.split(' '));

var depth = 0;
var hpos = 0;

for (let i = 0; i < commands.length; i++) {
  var command = commands[i][0];
  var num = commands[i][1]

  if (command == 'forward') {
    hpos += parseInt(num)
  } else if (command == 'down') {
    depth += parseInt(num)
  } else if (command == 'up') {
    depth -= parseInt(num)
  };
  
}

console.log({depth,hpos});
console.log(depth*hpos);

debugger;
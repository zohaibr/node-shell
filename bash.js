var command = require('./command');
// Output a prompt
command.prompt();

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  if (cmd === 'pwd') {
    command.pwd();
  } else if (cmd === 'date') {
    command.date();
  } else {
    command.prompt();
  }
});

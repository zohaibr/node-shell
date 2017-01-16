var command = require('./command');
// Output a prompt
command.prompt();

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  let cmd = data.toString().trim(); // remove the newline
  if (command[cmd] === undefined) {
    process.stdout.write('You typed: ' + cmd);
  } else {
    command[cmd]();
  }
  command.prompt();
});

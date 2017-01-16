var command = require('./command');
// Output a prompt
command.prompt();

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  let cmd = data.toString().trim().split(' '); // remove the newline

  if (command[cmd[0]] === undefined) {
    process.stdout.write('You typed: ' + cmd);
  } else {
    command[cmd[0]](cmd.slice(1));
  }
  command.prompt();
});

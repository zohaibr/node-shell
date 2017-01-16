exports.pwd = function() {
  process.stdout.write(process.cwd());
  process.stdout.write('\nprompt > ');
};

exports.date = function() {
  var date = new Date().toString().trim();
  process.stdout.write(date);
  process.stdout.write('\nprompt > ');
};

exports.prompt = function() {
  process.stdout.write('prompt > ');
};

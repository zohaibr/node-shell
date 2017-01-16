let commandManager = {

  pwd: function() {
    process.stdout.write(process.cwd());
    process.stdout.write('\nprompt > ');
  },

  date: function() {
    var date = new Date().toString().trim();
    process.stdout.write(date);
    process.stdout.write('\nprompt > ');
  },

 prompt: function() {
    process.stdout.write('prompt > ');
  }

};

module.exports = commandManager;

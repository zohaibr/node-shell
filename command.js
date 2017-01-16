var fs = require('fs');

let commandManager = {

  pwd: function() {
    process.stdout.write(process.cwd());
  },

  date: function() {
    var date = new Date().toString().trim();
    process.stdout.write(date);
  },

 prompt: function() {
    process.stdout.write('\nprompt > ');
  },

  ls: function() {
    fs.readdir('.', function(err, filenames) {
      if (err) throw err;
      filenames.forEach(function(file) {
        process.stdout.write(file.toString().trim() + '\n');
      });
    });
  }
};

module.exports = commandManager;

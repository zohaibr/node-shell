var fs = require('fs');

let commandManager = {

  pwd: function() {
    process.stdout.write(process.cwd());
    this.prompt();
  },

  date: function() {
    var date = new Date().toString().trim();
    process.stdout.write(date);
    this.prompt();
  },

 prompt: function() {
    process.stdout.write('\nprompt > ');
  },

  ls: function() {
    fs.readdir('.', function(err, filenames) {
      if (err) { 
         console.error(err);
         this.prompt();
         return;
      }

      filenames.forEach(function(file) {
        process.stdout.write(file.toString().trim() + '\n');
      });
      this.prompt();
    });

  },

  echo: function(stringArray) {

    if(stringArray[0] === '$PATH') {
      let path = process.env.PATH;
      process.stdout.write(path);
      this.prompt();
      return;
    }
    process.stdout.write(stringArray.join(' '));
    this.prompt();
  },

  cat: function(filenames) {
    let allFileContents = [];

    filenames.forEach((file) => {
       fs.readFile('./' + file, (err, contents) => {
         allFileContents.push(contents);
         if(allFileContents.length === filenames.length) {
           process.stdout.write(allFileContents.join('\n'));
           this.prompt();
         }
       });
    });
  }
};

module.exports = commandManager;

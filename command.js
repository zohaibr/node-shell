var fs = require('fs');
var request = require('request');

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

    if (stringArray[0] === '$PATH') {
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
         if (allFileContents.length === filenames.length) {
           process.stdout.write(allFileContents.join('\n'));
           this.prompt();
         }
       }) ;
    });

  },

  head: function(filenames) {
    fs.readFile('./' + filenames[0], (err, content) => {
      let contents = content.toString().split('\n');
      for (var i = 0; i < 5; i++) {
        process.stdout.write(contents[i] + '\n');
      }
      this.prompt();
    });
  },

  tail: function(filenames) {
    fs.readFile('./' + filenames[0], (err, content) => {
      let contents = content.toString().split('\n');
      if (contents.lenth < 5) {
        process.stdout.write(contents + '\n');
      } else {
        for (var i = contents.length - 1; i > contents.length - 5; i--) {
          process.stdout.write(contents[i] + '\n');
        }
      }
      this.prompt();
    });
  },

  curl: function(siteaddress) {
    request(siteaddress[0].toString(), (error, response, body) => {
      if (!error && response.statusCode == 200) {
        process.stdout.write(body);
        this.prompt();
      }
    });

  }
};

module.exports = commandManager;

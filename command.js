var fs = require('fs');
var request = require('request');

let commandManager = {

  pwd: function(file, done) {
    let output = process.cwd();
    done(output);
  },

  date: function(file, done) {
    done(Date());
  },

 prompt: function() {
    process.stdout.write('\nprompt > ');
  },

  ls: function(file, done) {
    fs.readdir('.', function(err, filenames) {
      if (err) {
         console.error(err);
         return;
      }

      let output = '';
      filenames.forEach(function(file) {
        output += file.toString().trim() + '\n';
      });
      done(output);
    });

  },

  echo: function(stringArray, done) {

    let output = '';

    if (stringArray[0] === '$PATH') {
      let path = process.env.PATH;
      done(path);
      return;
    }
    done(stringArray.join(' '));
  },

  cat: function(filenames, done) {
    let allFileContents = [];

    filenames.forEach((file) => {
       fs.readFile('./' + file, (err, contents) => {
         allFileContents.push(contents);
         if (allFileContents.length === filenames.length) {
           done(allFileContents.join('\n'));
         }
       });
    });

  },

  head: function(filenames, done) {
    let output = '';
    fs.readFile('./' + filenames[0], (err, content) => {
      let contents = content.toString().split('\n');
      for (var i = 0; i < 5; i++) {
        output += contents[i] + '\n';
      }
      done(output);
    });
  },

  tail: function(filenames, done) {
    let output = '';
    fs.readFile('./' + filenames[0], (err, content) => {
      let contents = content.toString().split('\n');
      if (contents.lenth < 5) {
        done(contents + '\n');
      } else {
        for (var i = contents.length - 1; i > contents.length - 5; i--) {
          output += contents[i] + '\n';
        }
      }
      done(output);
    });
  },

  curl: function(siteaddress, done) {
    request(siteaddress[0].toString(), (error, response, body) => {
      if (!error && response.statusCode == 200) {
        done(body);
      }
    });

  },

  find: function(directory, done) {
    
  }
};

module.exports = commandManager;

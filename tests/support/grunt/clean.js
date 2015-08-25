var config = require("./_config");

module.exports = function(grunt) {
   grunt.config.merge({

      clean: {
         testScreenshots: config.files.testScreenshots
      }

   });
};
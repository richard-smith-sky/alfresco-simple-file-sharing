var config = require("./_config");

module.exports = function(grunt) {
   grunt.config.merge({
      open: {
         nodeInspector: {
            path: 'http://localhost:1234/?ws=localhost:1234&port=5858',
            app: 'chrome'
         }
      }
   });
};
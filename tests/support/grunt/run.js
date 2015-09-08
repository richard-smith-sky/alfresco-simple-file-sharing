var config = require("./_config");

module.exports = function(grunt) {
   grunt.config.merge({

      run: {
         nodeInspector: {
            exec: "node-inspector -p=1234 -d=5858",
            options: {
               wait: false,
               quiet: true
            }
         },
         internDebug: {
            exec: "node --debug-brk node_modules/intern/bin/intern-runner config=tests/intern_debug.js"
         }
      }

   });
};
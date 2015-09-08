var notify = require("../../../node_modules/grunt-notify/lib/notify-lib"),
   tcpPortUsed = require("tcp-port-used");

module.exports = function(grunt) {

   // Test tasks
   grunt.registerTask("test", ["waitServer:application", "waitServer:selenium", "clean:testScreenshots", "intern:local"]);
   grunt.registerTask("test_debug", ["waitServer:application", "waitServer:selenium", "run:nodeInspector", "clean:testScreenshots", "open:nodeInspector", "run:internDebug"]);
   grunt.registerTask("test_bs", ["waitServer:application", "clean:testScreenshots", "intern:bs"]);

   // Notifications
   grunt.event.on("intern.fail", function(data) {
      notify({
         title: "Unit test(s) failed",
         message: data
      });
   });
   grunt.event.on("intern.pass", function(data) {
      notify({
         title: "Unit test(s) passed successfully",
         message: data
      });
   });

   // Intern routines
   grunt.config.merge({
      intern: {
         local: {
            options: {
               runType: "runner",
               config: "tests/intern"
            }
         },
         bs: {
            options: {
               runType: "runner",
               config: "tests/intern_bs"
            }
         }
      }
   });
};
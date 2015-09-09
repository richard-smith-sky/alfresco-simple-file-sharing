var notify = require("../../../node_modules/grunt-notify/lib/notify-lib"),
   tcpPortUsed = require("tcp-port-used"),
   config = require("./_config");

module.exports = function(grunt) {

   // Test tasks
   grunt.registerTask("test", [
      "waitServer:application",
      "run:selenium",
      "waitServer:selenium",
      "clean:testScreenshots",
      "intern:local",
      "stop:selenium"
   ]);

   grunt.registerTask("test_debug", [
      "waitServer:application",
      "run:selenium",
      "waitServer:selenium",
      "run:nodeInspector",
      "waitServer:nodeInspector",
      "clean:testScreenshots",
      "open:nodeInspector",
      "run:internDebug",
      "stop:nodeInspector",
      "stop:selenium"
   ]);

   grunt.registerTask("test_bs", [
      "waitServer:application",
      "clean:testScreenshots",
      "intern:bs"
   ]);

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

   // Module configurations
   grunt.config.merge({

      // Directory cleaning options
      clean: {
         testScreenshots: config.files.testScreenshots
      },

      // Run processes
      run: {
         selenium: {
            exec: "selenium-standalone start",
            options: {
               wait: false,
               quiet: true
            }
         },
         nodeInspector: {
            exec: "node-inspector -p=1234 -d=5858",
            options: {
               wait: false,
               quiet: true
            }
         },
         internDebug: {
            exec: "node --debug-brk node_modules/intern/bin/intern-runner config=tests/intern_debug.js",
            options: {
               wait: true,
               quiet: false
            }
         }
      },

      // Open a url
      open: {
         nodeInspector: {
            path: 'http://localhost:1234/?ws=localhost:1234&port=5858',
            app: 'chrome'
         }
      },

      // Wait for processes to become available
      waitServer: {
         selenium: {
            options: {
               url: config.urls.selenium,
               interval: 3 * 1000,
               timeout: 60 * 1000,
               fail: function () {
                  console.error('Selenium is not responding on: ' + config.urls.selenium);
               }
            }
         },
         nodeInspector: {
            options: {
               url: config.urls.nodeInspector,
               interval: 3 * 1000,
               timeout: 60 * 1000,
               fail: function () {
                  console.error('Node inspector is not responding on: ' + config.urls.nodeInspector);
               }
            }
         },
         application: {
            options: {
               url: config.urls.application,
               interval: 3 * 1000,
               timeout: 60 * 1000,
               fail: function () {
                  console.error('The target application is not responding on: ' + config.urls.application);
               }
            }
         }
      },

      // Intern runner configurations - note internDebug is implemented elsewhere
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
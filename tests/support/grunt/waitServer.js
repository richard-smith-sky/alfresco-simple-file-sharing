var config = require("./_config");

module.exports = function(grunt) {

   grunt.config.merge({
      waitServer: {
         selenium: {
            options: {
               url: config.urls.selenium,
               interval: 3 * 1000,
               timeout: 60 * 1000,
               fail: function () {
                  console.error('Selenium is not responding on the configured url');
               }
            }
         },
         application: {
            options: {
               url: config.urls.application,
               interval: 3 * 1000,
               timeout: 60 * 1000,
               fail: function () {
                  console.error('The target application is not responding on the configured url');
               }
            }
         }
      }
   });
};
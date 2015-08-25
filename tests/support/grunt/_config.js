/* Consolidated configuration file for the grunt tasks */
module.exports = {

   urls: {
      selenium: "http://localhost:4444/wd/hub",
      application: "http://localhost:8080/share/page/"
   },

   // Files/filesets
   files: {
      gruntFile: "Gruntfile.js",
      gruntTasks: "tests/support/grunt/**/*.js",
      testScreenshots: "tests/support/screenshots/*.png"
   },

   // Directories
   dirs: {
   }
};
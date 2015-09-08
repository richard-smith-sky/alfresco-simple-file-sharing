/* Consolidated configuration file for the grunt tasks */
module.exports = {

   urls: {
      selenium: "http://localhost:4444/wd/hub",
      nodeInspector: "http://localhost:1234/?ws=localhost:1234&port=5858",
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
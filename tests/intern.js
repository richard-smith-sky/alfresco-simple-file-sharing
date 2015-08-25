// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define(["./support/Suite"],
       function (Suite) {

   return {

      // The port on which the instrumenting proxy will listen
      proxyPort: 9000,

      // A fully qualified URL to the Intern proxy
      proxyUrl: "http://localhost:9000/",

      // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
      // specified browser environments in the `environments` array below as well. See
      // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
      // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
      // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
      // automatically
      capabilities: {
         "selenium-version": "2.45.0"
      },

      // Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
      // OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
      // capabilities options specified for an environment will be copied as-is
      environments: [
         {
            browserName: "chrome",
            chromeOptions: {
               excludeSwitches: ["ignore-certificate-errors"]
            }
         },
         {
            browserName: "firefox"
         }
         // ,
         // {
         //    browserName: "internet explorer"
         // }
      ],

      // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
      maxConcurrency: 1,

      // Dig Dug tunnel handler
      tunnel: "NullTunnel",

      // Dig Dug tunnel options
      tunnelOptions: {
         hostname: "localhost",
         port: 4444
      },

      // Configuration options for the module loader; any AMD configuration options supported by the Dojo loader can be
      // used here
      loaderOptions: {
         // Packages that should be registered with the loader in each testing environment
         packages: [
            {
               name: "config",
               location: "./tests/support/config/local"
            },
            {
               name: "dojo",
               location: "./node_modules/dojo"
            },
            {
               name: "properties",
               location: "./tests/support/config/properties"
            },
            {
               name: "reporters",
               location: "./tests/support/reporters"
            },
            {
               name: "utils",
               location: "./tests/support/utils"
            }
         ]
      },

      // Non-functional test suite(s) to run in each browser
      suites: Suite.unitTests,

      // Functional test suite(s) to run in each browser once non-functional tests are completed
      functionalSuites: Suite.functionalTests,

      // A regular expression matching URLs to files that should not be included in code coverage analysis
      excludeInstrumentation: /^(?:tests|node_modules)\//,

      // An array of code coverage reporters to invoke
      reporters: [
         // "Console",
         "reporters/Reporter"
      ]

   };
});
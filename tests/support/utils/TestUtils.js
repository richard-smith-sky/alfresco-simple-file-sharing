/*jshint unused:false,devel:true*/

/**
 * Copyright (C) 2005-2015 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @author Richard Smith
 */
define(["intern/dojo/node!fs",
        "intern/dojo/node!http",
        "intern/dojo/node!os",
        "intern/dojo/lang",
        "intern",
        "config/Config",
        "intern/dojo/Promise",
        "intern/dojo/node!leadfoot/helpers/pollUntil"],
        function(fs, http, os, lang, intern, Config, Promise, pollUntil) {
   return {

      /**
       * This function should be used to load pages.
       *
       * @instance
       * @param {object} browser The browser context to use
       * @param {string} testPath The path of the test page
       * @param {string} testName The name of the test to run
       */
      loadPage: function (browser, path, testName) {
         this._applyTimeouts(browser);
         this._sizeWindow(browser);
         this._cancelModifierKeys(browser);

         // return browser.get(this._getPageURL(path)).end();
         var command = browser.get(this._getPageURL(path))
            // .then(pollUntil(
            //    function() {
            //       /*jshint browser:true*/
            //       var elements = document.getElementsByClassName("aikau-reveal");
            //       return elements.length > 0 ? true : null;
            //    }, [], 10000, 1000))
            // .then(
            //    function (element) {
            //    },
            //    function (error) {
            //       // Failed to load, trying again...
            //       browser.refresh();
            //    })
            // .then(pollUntil(
            //    function() {
            //       /*jshint browser:true*/
            //       var elements = document.getElementsByClassName("aikau-reveal");
            //       return elements.length > 0 ? true : null;
            //    }, [], 10000, 1000))
            // .then(
            //    function (element) {
            //       // Loaded successfully
            //    },
            //    function (error) {
            //       // Failed to load after two attempts
            //       if (noPageLoadError === true)
            //       {
            //          // Don't output an error message
            //       }
            //       else
            //       {
            //          assert.fail(null, null, "Test page could not be loaded");
            //       }
            //    })
            .end();
         command.session.screenieIndex = 0;
         command.session.screenie = function(description) {
            var safeBrowserName = browser.environmentType.browserName.replace(/\W+/g, "_")
               .split("_")
               .map(function(namePart) {
                  return namePart.length > 1 ? namePart.substr(0, 1)
                     .toUpperCase() + namePart.substr(1)
                     .toLowerCase() : namePart.toUpperCase();
               })
               .join("_"),
               screenshotName = safeBrowserName + "-" + testName + "-" + command.session.screenieIndex++ + ".png",
               screenshotPath = "tests/support/screenshots/" + screenshotName,
               infoId = "TestCommon__webpage-info",
               dfd = new Promise.Deferred();
            browser.executeAsync(function(id, desc, asyncComplete) {
                  var oldInfo = document.getElementById(id);
                  oldInfo && document.body.removeChild(oldInfo);
                  var urlDisplay = document.createElement("DIV");
                  urlDisplay.id = id;
                  urlDisplay.style.background = "#666";
                  urlDisplay.style.borderRadius = "0 0 0 5px";
                  urlDisplay.style.color = "#fff";
                  urlDisplay.style.fontFamily = "Open Sans Bold, sans-serif";
                  urlDisplay.style.fontSize = "12px";
                  urlDisplay.style.lineHeight = "18px";
                  urlDisplay.style.opacity = ".9";
                  urlDisplay.style.padding = "10px";
                  urlDisplay.style.position = "fixed";
                  urlDisplay.style.right = "0";
                  urlDisplay.style.top = "0";
                  urlDisplay.appendChild(document.createTextNode("Time: " + (new Date()).toISOString()));
                  urlDisplay.appendChild(document.createElement("BR"));
                  urlDisplay.appendChild(document.createTextNode("URL: " + location.href));
                  if (desc) {
                     urlDisplay.appendChild(document.createElement("BR"));
                     urlDisplay.appendChild(document.createTextNode("Description: \"" + desc + "\""));
                  }
                  document.body.appendChild(urlDisplay);
                  setTimeout(asyncComplete, 0);
               }, [infoId, description])
               .takeScreenshot()
               .then(function(screenshot) {
                  fs.writeFile(screenshotPath, screenshot.toString("binary"), "binary", function(err) {
                     if (err) {
                        dfd.reject(err);
                     } else {
                        dfd.resolve();
                     }
                  });
               });
            return dfd.promise;
         };

         return command;
      },

      /**
       * Set browser timeouts - refer to Config files
       *
       * @instance
       * @param {browser}
       */
      _applyTimeouts: function(browser) {
         browser.setTimeout("script", Config.timeout.base);
         browser.setTimeout("implicit", Config.timeout.base);
         browser.setFindTimeout(Config.timeout.find);
         browser.setPageLoadTimeout(Config.timeout.pageLoad);
         browser.setExecuteAsyncTimeout(Config.timeout.executeAsync);
      },

      /**
       * Sizes the browser window if not already sized
       *
       * @instance
       * @param {browser}
       */
      _sizeWindow: function(browser) {
         browser.setWindowSize(null, 1024, 768);
      },

      /**
       * Cancels modifier keys
       *
       * @instance
       * @param {browser}
       */
      _cancelModifierKeys: function(browser) {
         browser.pressKeys(null);
      },

      /**
       * Generates the URL to use for loading the page
       *
       * @instance
       * @param {string} path The WebScript path
       */
      _getPageURL: function (path) {
         if (!Config.url.appBaseUrl) {
            Config.url.appBaseUrl = "http://" + this._getLocalIP() + ":8080";
         }
         return Config.url.appBaseUrl + path;
      },

      /**
       * Get the local machine IP address (for us from other machines on the network). Specifically,
       * it will pass back the first IPv4, external IP address whose name begins with an "e".
       * 
       * @instance
       * @protected
       * @returns  {string} The local IP address
       */
      _getLocalIP: function() {
         var networkInterfaces = os.networkInterfaces(),
            validNameRegex = /^e[a-z]+[0-9]$/i,
            ipAddress = null;
         Object.keys(networkInterfaces).every(function(interfaceName) {
            if (validNameRegex.test(interfaceName)) {
               networkInterfaces[interfaceName].every(function(interface) {
                  if (interface.family === "IPv4" && !interface.internal) {
                     ipAddress = interface.address;
                     return false;
                  }
                  return true;
               });
            }
            if (ipAddress) {
               return false;
            }
            return true;
         });
         return ipAddress;
      }
   };
});
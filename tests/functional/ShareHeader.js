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
define(["intern!object",
        "intern/chai!assert",
        "intern/chai!expect",
        "require",
        "utils/TestUtils",
        "utils/Steps",
        "properties/Properties"],  
        function (registerSuite, assert, expect, require, TestUtils, Steps, Properties) {

   var selector = {
         HEADER_LOGO: "#HEADER_LOGO img",
         HEADER_TITLE: "#HEADER_TITLE"
      };

   registerSuite(function() {
      
      var browser;

      return {

         name: "Share Header test",

         setup: function() {
            browser = this.remote;
            return Steps.loginAs(browser, "admin");
         },

         teardown: function() {
            return Steps.logout(browser);
         },

         beforeEach: function() {
            browser.end();
         },

         "Test share header logo": function() {
            return browser

            .findByCssSelector(selector.HEADER_LOGO)
            .getProperty("alt")
               .then(function(altText) {
                  expect(altText).to.equal(Properties.shareHeaderLogoAltText, "Share header logo has incorrect alt text");
               });
         },

         "Test share dashboard title": function() {
            return browser

            .findByCssSelector(selector.HEADER_TITLE)
               .getVisibleText()
               .then(function(title) {
                  expect(title).to.equal(Properties.shareHeaderTitle, "Share dashboard title is wrong");
               });
         }
      };
   });
});
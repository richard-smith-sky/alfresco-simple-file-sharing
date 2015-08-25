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
        "utils/Steps"],  
        function (registerSuite, assert, expect, require, TestUtils, Steps) {

   var browser,
      selector = {
         ADMIN_CONSOLE_MENU: "div.tools-link ul",
         ADMIN_CONSOLE_MENU_ITEM: "div.tools-link ul li"
      };

   registerSuite({
      name: "Admin console test",

      setup: function() {
         browser = this.remote;
         browser = Steps.loginAs(browser, "admin");
         browser = Steps.gotoAdminConsole(browser);
         return browser;
      },

      teardown: function() {
         return Steps.logout(browser);
      },

      beforeEach: function() {
         browser.end();
      },

      "Test admin console menus": function() {
         return browser

         .findAllByCssSelector(selector.ADMIN_CONSOLE_MENU)
            .then(function (menus) {
               expect(menus).to.have.length.of(3, "An incorrect number of admin menus is seen");
            })
            .end()

         .findAllByCssSelector(selector.ADMIN_CONSOLE_MENU_ITEM)
            .then(function (menuItems) {
               expect(menuItems).to.have.length.of(9, "An incorrect number of admin menu items is seen");
            });
      }
   });
});
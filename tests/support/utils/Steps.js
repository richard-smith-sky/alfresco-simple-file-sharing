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
define(["intern/chai!assert",
        "utils/TestUtils",
        "config/Config",
        "dojo/_base/lang"],
        function(assert, TestUtils, Config, lang) {

   var selector = {
      LOGIN_FORM: "form.login",
      LOGIN_FORM_USERNAME: "form.login input[name='username']",
      LOGIN_FORM_PASSWORD: "form.login input[name='password']",
      LOGIN_FORM_SUBMIT: "form.login button",
      SHARE_HEADER_USER_MENU: "#HEADER_USER_MENU_POPUP",
      SHARE_HEADER_USER_MENU_LOGOUT: "#HEADER_USER_MENU_LOGOUT",
      SHARE_HEADER_ADMIN_CONSOLE: "#HEADER_ADMIN_CONSOLE"
   };

   return {

      /**
       * This function logs into share.
       *
       * @instance
       * @param {object} browser The browser context to use
       */
      loginAs: function (browser, accountName) {

         var account = lang.getObject(accountName, false, Config.accounts);
         if(!account)
         {
            assert.fail(null, null, "Login account not found");
         }

         return TestUtils.loadPage(browser, "/share/page/", "Login")

         .findByCssSelector(selector.LOGIN_FORM)
            .then(
               function (element) {},
               function (error) {
                  assert.fail(null, null, "Login form not found");
               }
            )
            .end()

         .findByCssSelector(selector.LOGIN_FORM_USERNAME)
            .type(account.username)
            .end()

         .findByCssSelector(selector.LOGIN_FORM_PASSWORD)
            .type(account.password)
            .end()

         .findByCssSelector(selector.LOGIN_FORM_SUBMIT)
            .click()
            .end();
      },

      /**
       * This function logs out of share.
       *
       * @instance
       * @param {object} browser The browser context to use
       */
      logout: function (browser) {

         return browser

         .findByCssSelector(selector.SHARE_HEADER_USER_MENU)
            .then(
               function (element) {},
               function (error) {
                  assert.fail(null, null, "Share header user menu not found");
               }
            )
            .click()
            .end()

         .findByCssSelector(selector.SHARE_HEADER_USER_MENU_LOGOUT)
            .then(
               function (element) {},
               function (error) {
                  assert.fail(null, null, "Share header logout button not found");
               }
            )
            .click()
            .end();
      },

      /**
       * This function navigates to the admin console.
       *
       * @instance
       * @param {object} browser The browser context to use
       */
      gotoAdminConsole: function (browser) {

         return browser

         .findByCssSelector(selector.SHARE_HEADER_ADMIN_CONSOLE)
            .then(
               function (element) {},
               function (error) {
                  assert.fail(null, null, "Share header admin link not found");
               }
            )
            .click()
            .end();
      }
   };
});
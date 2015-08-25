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
 * This provides the configuration for test suites.
 *
 * @author Richard Smith
 */
define({

   /**
    * The project name
    * @instance
    * @type {String}
    */
   projectName: "Simple File Sharing",

   /**
    * The project prefix
    * @instance
    * @type {String}
    */
   projectPrefix: "SFS",

   /**
    * Key to identify your test runs
    * @instance
    * @type {String}
    * @optional
    */
   sessionKey: "RDS",

   /**
    * This is the array of functional tests
    * @instance
    * @type {string[]}
    */
   xfunctionalTests: [], // Uncomment and add specific tests during development

   /**
    * This is the array of functional tests
    * @instance
    * @type {string[]}
    */
   functionalTests: [
      "tests/functional/ShareHeader",
      "tests/functional/AdminConsole"
   ],

   /**
    * This is the array of unit tests
    * @instance
    * @type {string[]}
    */
   xunitTests: [], // Uncomment and add specific tests during development

   /**
    * This is the array of unit tests
    * @instance
    * @type {string[]}
    */
   unitTests: []

});
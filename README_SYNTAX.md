# Simple File Sharing - Test Framework - Code Snippets

This file contains examples of Intern / Leadfoot / Chai syntax that you might find useful when writing tests for Simple File Sharing.

## Contents

<!-- MarkdownTOC -->

- [Find an Element](#find-an-element)
    - [By Id](#by-id)
    - [By css selector](#by-css-selector)
    - [Specifying an id or css selector at the top of the test file](#specifying-an-id-or-css-selector-at-the-top-of-the-test-file)
    - [By Id which is specified at the top of the test file](#by-id-which-is-specified-at-the-top-of-the-test-file)
    - [By css selector which is specified at the top of the test file](#by-css-selector-which-is-specified-at-the-top-of-the-test-file)
    - [Find many items by css selector](#find-many-items-by-css-selector)
- [Element interactions](#element-interactions)
    - [Get the text](#get-the-text)
    - [Click a button](#click-a-button)
    - [Type into a form field](#type-into-a-form-field)
    - [Get an Element property](#get-an-element-property)
- [Scope termination](#scope-termination)
    - [Single Element test](#single-element-test)
    - [Multiple Element test](#multiple-element-test)
- [Checking for multiple Elements and that an Element is NOT present](#checking-for-multiple-elements-and-that-an-element-is-not-present)
    - [Counting the number of items present](#counting-the-number-of-items-present)
    - [Checking an Element is NOT present](#checking-an-element-is-not-present)
- [Should, Expect and Assert](#should-expect-and-assert)
- [Test templates](#test-templates)
    - [One complete test](#one-complete-test)
    - [A complete test file with setup and teardown examples](#a-complete-test-file-with-setup-and-teardown-examples)
- [Useful tools during development](#useful-tools-during-development)
    - [SelectorGadget for Chrome](#selectorgadget-for-chrome)
    - [CSS Selector Tester for Chrome](#css-selector-tester-for-chrome)
    - [FirePath for FireFox](#firepath-for-firefox)
    - [Firefinder for FireFox](#firefinder-for-firefox)
- [Further resources](#further-resources)

<!-- /MarkdownTOC -->

## Find an Element

### By Id
```javascript
.findById("MY_ELEMENT")
```

### By css selector
```javascript
.findByCssSelector("#MY_ELEMENT div > ul > li")
```

### Specifying an id or css selector at the top of the test file
Element ids and css selectors are specified in an object called '*selector*'.

```javascript
var browser,
    selector = {
        MY_ELEMENT_ID: "MY_ELEMENT",
        MY_ELEMENT_CSS_SELECTOR: "#MY_ELEMENT div > ul > li",
        MY_BUTTON: "button#MY_BUTTON",
        MY_INPUT_FIELD: "form#MY_FORM input.nameField"
    };
```

All ids and css selectors should be specified at the top of the test file to make minor selector modifications more simple to implement. All examples will assume this style from now on.

### By Id which is specified at the top of the test file
```javascript
.findById(selector.MY_ELEMENT_ID)
```

### By css selector which is specified at the top of the test file
```javascript
.findByCssSelector(selector.MY_ELEMENT_CSS_SELECTOR)
```

### Find many items by css selector
```javascript
.findAllByCssSelector(selector.MY_ELEMENT_CSS_SELECTOR)
```

## Element interactions

### Get the text
This example gets the visible text at the Element defined by '*selector.MY_ELEMENT_ID*'. It then **expects** that it should be equal in value to the property defined by *Properties.someText* and shows an error message if it is not.

```javascript
.findById(selector.MY_ELEMENT_ID)
    .getVisibleText()
    .then(function(text) {
        expect(text).to.equal(Properties.someText, "The text shown is not correct");
    });
```

### Click a button
```javascript
.findByCssSelector(selector.MY_BUTTON)
    .click();
```

### Type into a form field
```javascript
.findByCssSelector(selector.MY_INPUT_FIELD)
    .type("Richard")
```

### Get an Element property
This will find the '*name*' property of the Element defined by selector '*MY_INPUT_FIELD*'.

```javascript
.findByCssSelector(selector.MY_INPUT_FIELD)
    .getProperty("name")
```

## Scope termination

Whenever a find action is performed, and assuming that the Element in question is found, then the driver is scoped specifically to that Element. In a simple test that might be fine if only one interaction and one assertion is expected. The framework typically terminates scope after each test automatically. However, if a more complex test is required it may be necessary to '**end()**' the initial Element scope.

### Single Element test
This will test the '*alt*' property of the Element defined by the selector ID '*MY_ELEMENT_ID*' and error if it is not equal to to the value defined by *Properties.testAltText*

```javascript
.findByID(selector.MY_ELEMENT_ID)
    .getProperty("alt")
    .then(function(altText) {
        expect(altText).to.equal(Properties.testAltText, "Incorrect alt text");
    });
```

### Multiple Element test
This is a slightly contrived example but would be the finding of a form field '*selector.MY_INPUT_FIELD*' into which is typed 'Pickle', followed by the clicking of a button '*selector.MY_BUTTON*' which might submit that form, and finally another find to investigate and assert what had happened. All you really need to take from this is the syntax with the '*end()*' commands to take focus away from the found Element. Although not enforced, the indent syntax shown helps with keeping track of the currently focussed Element.

```javascript
.findByCssSelector(selector.MY_INPUT_FIELD)
    .type("Pickle")
    .end()

.findByCssSelector(selector.MY_BUTTON)
    .click()
    .end()

.findByID(selector.MY_ELEMENT_ID)
    .getProperty("alt")
    .then(function(altText) {
        expect(altText).to.equal(Properties.testAltText, "Incorrect alt text");
    });
```

## Checking for multiple Elements and that an Element is NOT present

### Counting the number of items present
This example will get **All** items which match the selector specified. The returned object for use in the closure is an array and therefore has a length that can be interrogated by the '*expect*'. Here the list items tested should have a length of 8 or an exception will be thrown.

```javascript
.findAllByCssSelector(selector.MY_ELEMENT_CSS_SELECTOR)
    .then(function (listItems) {
        expect(listItems).to.have.length.of(8, "An incorrect number of list items is seen");
    })
```

### Checking an Element is NOT present
There are two ways in which you can test for the absence of an Element.

#### Basic find
Any of the find commands supports two closures - one to be run if the Element is found and one for when the Element is not found. Here is an example that will throw an exception if an Element which is expected NOT to be there, is found.

```javascript
.findByCssSelector(selector.MY_ELEMENT_ID)
    .then(
        function (element) {
            assert.fail(null, null, "The Element should not be present");
        },
        function (error) {
        }
    );
```

And this would be the opposite which errors when the element is missing:

```javascript
.findByCssSelector(selector.MY_ELEMENT_ID)
    .then(
        function (element) {
        },
        function (error) {
            assert.fail(null, null, "The Element could not be found");
        }
    );
```

In ordinary use the second option is not necessary because the framework will throw an exception when you try to interact with a missing Element.

Intern has a number of predefined timeouts. The timeout for finding an element on the screen is currently set at 5 seconds. This is seperate from the page loading time and during this period the tool will poll constantly. If you use the appropach shown here to test for a missing Element, you will be forced to wait 5 seconds until it can proceed. This may not sound like very much but timeouts such as this can cause very long Suite runtimes, so they are best avoided. There is a second way to test that an item is NOT present using a '*findAll*' type of command:

#### Element not present with findAll command
This example uses a findAll command to look for a particular selector. We are not expecting this Element to be present so we expect the result to have a length of zero - no results. The advantage of using this command is that it is instantaneous and does not wait for the find timeout.

```javascript
.findAllByCssSelector(selector.MY_ELEMENT_CSS_SELECTOR)
    .then(function (items) {
        expect(items).to.have.length.of(0, "The Element should not be present");
    })
```

## Should, Expect and Assert

Intern uses the [Chai Assertion Library](http://chaijs.com/). Chai supports 3 different styles of assertion statement which can be used interchangeably. You just need to include the correct module in your dependencies list. Have a read of the options on the Chai website for further information. Here are some examples taken from there:

```javascript
foo.should.be.a("string");
foo.should.equal("bar");
foo.should.have.length(3);
tea.should.have.property('flavors').with.length(3);

expect(foo).to.be.a("string");
expect(foo).to.equal("bar");
expect(foo).to.have.length(3);
expect(tea).to.have.property("flavors").with.length(3);

assert.typeOf(foo, "string");
assert.equal(foo, "bar");
assert.lengthOf(foo, 3)
assert.property(tea, "flavors");
assert.lengthOf(tea.flavors, 3);
```

You can optionally include custom error messages with Chai statements although the standard errors are quite good:

```javascript
foo.should.be.a("string", "Foo is not a string");
foo.should.equal("bar", "Foo does not equal bar");
```

## Test templates

### One complete test
```javascript
"This is the name of my test": function() {
    return browser

    .findAllByCssSelector(selector.MY_ELEMENT_CSS_SELECTOR)
        .then(function (items) {
            expect(items).to.have.length.of(3, "An incorrect number of items is seen");
        });
}
```

This is an example of a complete test of which there may be several in a test file. Remember that if there was more than one find required in this test, the first one would need to be terminated with an **.end()** entry. A test is a named javascript function which returns an instance of browser. Internally it is most obviously a promise chain of selenium statements invoking closures containing chai assertions. For this syntax to work, '*browser*' has been declared earlier in the file.

### A complete test file with setup and teardown examples
```javascript
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
 * @author A Developer
 */
define(["intern!object",
        "intern/chai!expect",
        "require",
        "utils/TestUtils",
        "utils/Steps"],  
        function (registerSuite, expect, require, TestUtils, Steps) {

    var selector = {
        ADMIN_CONSOLE_MENU: "div.tools-link ul",
        ADMIN_CONSOLE_MENU_ITEM: "div.tools-link ul li"
    };

    registerSuite(function() {
        var browser;
        
        return {
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
        };
    });
});
```

This is a complete test file with a copyright statement, an author (please include your name) and the test. Reading down the code you will see:

1. A list of dependencies that are then aliased in the function statement.
2. **Var**iables to hold the browser instance and the selector instance.
3. An Intern function registerSuite with a name property.
4. Three predefined Intern functions for **setup**, **teardown** and **beforeEach**.
    1. In this example **setup** and **teardown** contain Step functions which are utility functions written in dependecy file Steps.js. Here they perform simple login, navigate and logout functions.
    2. **beforeEach** is a function which runs before each named test function. It performs the *browser.end()* so that we don't have to write that after every find in a simple test.
5. One named test containing two finds and assertions using Chai.expect.

## Useful tools during development

### SelectorGadget for Chrome
SelectorGadget is an open source tool that makes CSS selector generation and discovery on complicated sites a breeze.
<https://chrome.google.com/webstore/detail/selectorgadget/mhjhnkcfbdhnjickkkdbjoemdmbfginb>

### CSS Selector Tester for Chrome
Test your css selector by using this quick script.
<https://chrome.google.com/webstore/detail/css-selector-tester/bbklnaodgoocmcdejoalmbjihhdkbfon>
 
### FirePath for FireFox
FirePath is a Firebug extension that adds a development tool to edit, inspect and generate XPath 1.0 expressions, CSS 3 selectors and JQuery selectors.
<https://addons.mozilla.org/en-US/firefox/addon/firepath/>

### Firefinder for FireFox
Finds HTML elements matching chosen CSS selector(s) or XPath expression
<https://addons.mozilla.org/en-US/firefox/addon/firefinder-for-firebug/>

## Further resources

* [Documentation for Leadfoot](http://theintern.github.io/leadfoot/) - the Webdriver client library used within Intern
* [Documentation for Chai](http://chaijs.com/) - a BDD/TDD assertion library for Node, implemented in Intern

# Simple File Sharing - Test Framework

<!-- MarkdownTOC -->

- [Prerequisits](#prerequisits)
- [Installation](#installation)
- [Running a local test](#running-a-local-test)
- [Running a local test with debugging enabled](#running-a-local-test-with-debugging-enabled)
- [Configuring your machine to run a cloud test against BrowserStack](#configuring-your-machine-to-run-a-cloud-test-against-browserstack)
- [Running a cloud test (BrowserStack)](#running-a-cloud-test-browserstack)
- [Notes](#notes)
- [Resources](#resources)

<!-- /MarkdownTOC -->

## Prerequisits
**Note**: This proof is designed to operate against Alfresco Share, running locally on port 8080.
* [Download](https://nodejs.org/) and install NodeJS
* [Download](https://www.alfresco.com/products/community/download) an up-to-date Alfresco installer, install and start it
* Create a project directory on your system and clone this repository into it

## Installation
1. Open a shell window and navigate to the project directory
2. Run command "**npm install grunt@latest -g**" to download grunt, globally
3. Run command "**npm install grunt-cli@latest -g**" to download grunt-cli, globally
4. Run command "**npm install selenium-standalone@latest -g**" to download selenium-standalone, globally
5. Run command "**selenium-standalone install**" to finish the installation of selenium-standalone
6. Run command "**npm install**" to download the node packages defined in package.json

## Running a local test
1. Open a shell window, navigate to the project directory and run command "**grunt test**"

## Running a local test with debugging enabled
**Note**: A test run in debug mode will look identical to a local test unless you drop a breakpoint into your code. Try adding '**debugger;**' as a line entry anywhere within a closure in your code.

1. Open a shell window, navigate to the project directory and run command "**grunt test_debug**"
3. Node inspector will start automatically. When the launched debug session connects to the test run, you will need to click the 'Resume script execution (F8).' button to proceed.

## Configuring your machine to run a cloud test against BrowserStack
If this is the first time you have ever run a test against BrowserStack you will need to perform a configuration process as follows:

1. Obtain a BrowserStack login from the account manager
2. Visit BrowserStack, login and copy your username and access key from the console
3. Define **BROWSERSTACK_USERNAME** and **BROWSERSTACK_ACCESS_KEY** environment variables using the username and access key you have copied from BrowserStack
4. [Download](https://www.browserstack.com/local-testing#command-line) and run the appropriate application to setup a Local Testing connection from BrowserStack

## Running a cloud test (BrowserStack)
1. Open a shell window, navigate to the project directory and run command "**grunt test_bs**"

## Notes
- You can terminate the selenium process when you have finished local testing
- Whilst tests are running locally you can watch the selenium console here: <http://localhost:4444/wd/hub/static/resource/hub.html>
- Selenium should not be running locally if you are running a cloud test
- Whilst cloud tests are running you can watch them on BrowserStack here: <https://www.browserstack.com/automate>

## Resources
* [Documentation for Intern](https://theintern.github.io/) - A complete framework for testing Web sites and applications
* [Documentation for Leadfoot](http://theintern.github.io/leadfoot/) - a Webdriver client library used within Intern
* [Documentation for Chai](http://chaijs.com/) - a BDD/TDD assertion library for Node, implemented in Intern
* [BrowserStack](https://www.browserstack.com/) - one of the cloud testing facilities available for use in Intern
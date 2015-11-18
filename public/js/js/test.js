'use strict';
// This is a basic test file for use with testling.
// The test script language comes from tape.
var test = require('tape');

var webdriver = require('selenium-webdriver');
var seleniumHelpers = require('../../../../../test/selenium-lib');

function sendData(t) {
  var driver = seleniumHelpers.buildDriver();
  var sendButton;

  driver.get('file://' + process.cwd() +
      '/src/content/datachannel/datatransfer/index.html')
  .then(function() {
    t.pass('page loaded');
    // Based on https://saucelabs.com/resources/articles/selenium-file-upload
    return driver.findElement(webdriver.By.id('sendTheData'));
  })
  .then(function(button) {
    sendButton = button;
    sendButton.click();
    // The click is asynchronous.  Wait until the click has taken effect.
    return driver.wait(webdriver.until.elementIsDisabled(sendButton));
  }).then(function() {
    // The button will be re-enabled after the transfer completes.
    return driver.wait(webdriver.until.elementIsEnabled(sendButton));
  })
  .then(function() {
    t.end();
  })
  .then(null, function(err) {
    t.fail(err);
    t.end();
  });
}

test('In-memory datatransfer via Datachannels', function(t) {
  sendData(t);
});
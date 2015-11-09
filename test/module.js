'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Arrowjs:generators/module', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/module'))
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'module.js',
        'route.js'
    ]);
  });
});

'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('arrowjs:app/feature', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withArguments('cuong')
            .withPrompts({useModel: 'Y'})
            .on('end', done);
    });

    it('creates feature files', function () {

    });
});

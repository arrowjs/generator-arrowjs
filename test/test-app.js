'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('arrowjs:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({skipInstall: true})
            .withPrompts({appName: 'Hello World'})
            .on('end', done);
    });

    describe('creates files', function () {
        it('creates main files', function () {
            assert.file([
                'package.json',
                'server.js'
            ]);
        });

        it('creates feature files', function () {
            assert.file([
                'features/index/feature.js',
                'features/index/route.js',
                'features/index/controllers/index.js',
                'features/index/views/index.html'
            ]);
        });
    });
});

'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('arrowjs:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({skipInstall: true})
            .withPrompts({appName: 'Hello World', appType: 'Hello World 2'})
            .on('end', done);
    });

    describe('creates files', function () {
        it('creates main files', function () {
            assert.file([
                'package.json',
                'server.js'
            ]);
        });

        it('creates config files', function () {
            assert.file([
                'config/config.js',
                'config/mail.js',
                'config/redis.js',
                'config/structure.js',
                'config/view.js'
            ]);
        });

        it('creates module files', function () {
            let viewExtension = '.twig';

            assert.file([
                'modules/index/module.js',
                'modules/index/route.js',
                'modules/index/controller/index.js'
            ]);
        });
    });
});

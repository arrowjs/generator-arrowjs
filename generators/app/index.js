'use strict';

let yeoman = require('yeoman-generator');
let yosay = require('yosay');
let functions = require('../lib/function');
let templates = require('../lib/template');

module.exports = yeoman.generators.Base.extend({

    prompting: function () {
        let self = this;
        let done = self.async();

        this.log(yosay(
            'Welcome to the marvelous \x1b[36m Arrowjs \x1b[0m generator!'
        ));

        let prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'Enter name of the directory to contain the project:'
            },
            {
                type: 'confirm',
                name: 'useDatabase',
                message: 'Do you want to use Database ?'
            }
        ];

        functions.promptAsync(self, prompts).then(function (answers) {
            if (answers.useDatabase) {
                console.log('Configure database connection.');

                let promptsDB = [
                    {
                        type: 'input',
                        name: 'host',
                        message: 'Host: ',
                        default: 'localhost',
                        store: true
                    },
                    {
                        type: 'input',
                        name: 'database',
                        message: 'Database name: ',
                        store: true
                    },
                    {
                        type: 'input',
                        name: 'username',
                        message: 'Username: ',
                        store: true
                    },
                    {
                        type: 'password',
                        name: 'password',
                        message: 'Password: '
                    },
                    {
                        type: 'list',
                        name: 'dialect',
                        message: 'Dialect: ',
                        choices: ['postgres', 'mysql', 'mariadb', 'sqlite'],
                        store: true
                    }
                ];

                return functions.promptAsync(self, promptsDB).then(function (dbconfig) {
                    self.props = answers;
                    self.dbconfig = dbconfig;
                });
            } else {
                self.props = answers;
            }
        }).then(function () {
            done();
        });
    },

    writing: function () {
        let fs = this.fs;

        // Create features directory and public directory
        fs.copy(
            this.templatePath('features'),
            this.destinationPath(this.props.appName + '/features')
        );
        fs.copy(
            this.templatePath('public'),
            this.destinationPath(this.props.appName + '/public')
        );

        // Create "server.js" and "package.json"
        fs.copy(
            this.templatePath('_server.js'),
            this.destinationPath(this.props.appName + '/server.js')
        );
        fs.copy(
            this.templatePath('_package.json'),
            this.destinationPath(this.props.appName + '/package.json')
        );

        // Create config "development.js" and "structure.js"
        if (this.dbconfig) {   // If use database
            fs.copy(
                this.templatePath('_structure_db.js'),
                this.destinationPath(this.props.appName + '/config/structure.js')
            );

            let configContent = templates.config(this.dbconfig);
            fs.write(this.props.appName + '/config/env/development.js', configContent);
        } else {    // If don't use database
            fs.copy(
                this.templatePath('_development.js'),
                this.destinationPath(this.props.appName + '/config/env/development.js')
            );
            fs.copy(
                this.templatePath('_structure.js'),
                this.destinationPath(this.props.appName + '/config/structure.js')
            );
        }
    },

    install: function () {
        process.chdir(this.props.appName + '/');
        this.npmInstall();
    },

    end: function () {
        console.log(`\x1b[36m Done. To get started fast: \x1b[0m`);
        console.log(`\x1b[36m    $ cd ${this.props.appName} \x1b[0m`);
        console.log(`\x1b[36m    $ node server.js \x1b[0m`);
    }
});

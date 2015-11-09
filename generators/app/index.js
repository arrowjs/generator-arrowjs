'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        this.log(yosay(
            'Welcome to the marvelous ' + chalk.red('Arrowjs') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: 'Your project name',
            default: this.appname // Default to current folder name
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            done();
        }.bind(this));
    },

    writing: {
        directories: function () {
            this.fs.copy(
                this.templatePath('config'),
                this.destinationPath(this.props.appName + '/config')
            );
            this.fs.copy(
                this.templatePath('modules'),
                this.destinationPath(this.props.appName + '/modules')
            );
        },

        files: function () {
            this.fs.copy(
                this.templatePath('_server.js'),
                this.destinationPath(this.props.appName + '/server.js')
            );
            this.fs.copy(
                this.templatePath('_package.json'),
                this.destinationPath(this.props.appName + '/package.json')
            );
        }
    },

    install: function () {
        process.chdir(this.props.appName + '/');
        this.npmInstall();
    },

    end: function(){
        console.log(chalk.magenta("Done. To get started fast:"));
        console.log(chalk.magenta("   $ cd " + this.props.appName));
        console.log(chalk.magenta("   $ node server.js"));
    }
});

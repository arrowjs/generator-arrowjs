'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.NamedBase.extend({
    initializing: function () {

    },

    writing: function () {
        this.fs.copy(
            this.templatePath('index'),
            this.destinationPath("modules/" + this.name)
        );
    },

    end: function(){
        console.log(chalk.magenta("Module " + this.name + " was created"));
    }
});

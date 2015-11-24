'use strict';

let yeoman = require('yeoman-generator');
let functions = require('../lib/function');
let templates = require('../lib/template');
let validator = require('../lib/validator');

function askProperty(self) {
    return functions.promptAsync(self, [{
        type: 'input',
        name: 'propertyName',
        message: 'Property name:'
    }]).then(function (answer1) {
        let propertyName = answer1.propertyName;
        let validateName = validator.validatePropertyName(propertyName);

        // If no answer => done.
        if (propertyName == null || propertyName == '') {
            return null;
        } else {
            // Check property name is valid
            if (validateName === true) {
                // Continue ask property type
                return functions.promptAsync(self, [{
                    type: 'list',
                    name: 'propertyType',
                    message: 'Property type:',
                    choices: ['string', 'text', 'integer', 'bigint', 'float', 'double', 'boolean', 'date']
                }]).then(function (answer2) {
                    console.log('Add more properties (enter an empty value when done).');

                    // Save answers
                    self.properties.push({
                        name: propertyName,
                        type: answer2.propertyType
                    });

                    // Continue ask more properties
                    return askProperty(self);
                });
            } else {
                console.log('\x1b[31m' + validateName + '\x1b[0m');
                return askProperty(self);
            }
        }
    });
}

module.exports = yeoman.generators.NamedBase.extend({

    initializing: function () {
        this.properties = [];
    },

    prompting: function () {
        let self = this;
        let done = self.async();

        functions.promptAsync(self, [{
            type: 'confirm',
            name: 'useModel',
            message: 'Do you want to create model?'
        }]).then(function (answer) {
            // If user want to use model, ask about model properties
            if (answer.useModel) {
                console.log('Let\'s add some properties now.\n Property "id" will be automatically added and use as Primary key.');

                return askProperty(self);
            } else {
                return null;
            }
        }).then(function () {
            return functions.promptAsync(self, [{
                type: 'confirm',
                name: 'addMenu',
                message: 'Do you want add feature to menu?'
            }]);
        }).then(function (confirm) {
            self.confirm = confirm;
            return done();
        });
    },

    writing: function (a) {
        let fs = this.fs;
        let name = this.name;
        let properties = this.properties;

        // Copy feature.js
        fs.copy(
            this.templatePath('_feature.js'),
            this.destinationPath(`features/${name}/feature.js`)
        );

        // If feature uses model
        if (properties.length) {
            // Create route.js
            let routeContent = templates.routeApi(name);
            fs.write(`features/${name}/route.js`, routeContent);

            // Create [model].js
            let modelProperies = [];
            for (let i in properties) {
                if (properties.hasOwnProperty(i)) {
                    let property = properties[i];
                    modelProperies.push(property.name + ': DataTypes.' + property.type.toUpperCase());
                }
            }
            modelProperies = modelProperies.join(',\n\t\t');
            fs.write(
                `features/${name}/models/${name}.js`,
                templates.model(name, modelProperies)
            );

            // Create controller
            let viewContent = templates.controllerApi(name);
            fs.write(`features/${name}/controllers/index.js`, viewContent);

            // Create view
            fs.copyTpl(
                this.templatePath('_api.html'),
                this.destinationPath(`features/${name}/views/index.html`),
                {name: name}
            );
        }
        // If feature does not use model
        else {
            // Create route.js
            let routeContent = templates.route(name);
            fs.write('features/' + name + '/route.js', routeContent);

            // Create controller
            fs.copy(
                this.templatePath('_index.js'),
                this.destinationPath(`features/${name}/controllers/index.js`)
            );

            // Create view
            fs.copyTpl(
                this.templatePath('_feature.html'),
                this.destinationPath(`features/${name}/views/index.html`),
                {name: name}
            );
        }

        // Add features to menu
        let filePath = 'public/_features.html';
        let features = fs.exists(filePath) ? fs.read(filePath) : '';
        if (properties.length)
            features += `\n<li><a href="/${name}/apis">${name}</a></li>`;
        else
            features += `\n<li><a href="/${name}">${name}</a></li>`;

        if (this.confirm.addMenu) {
            fs.write('public/_features.html', features);
        }
    },

    end: function () {
        console.log(`\x1b[36m Feature ${this.name} was created successfully. \x1b[0m`);
    }
});

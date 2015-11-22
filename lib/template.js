'use strict';

/**
 * Template for development.js
 */
module.exports.config = function (config) {
    return `
'use strict';

module.exports = {
    db: {
        host: '${config.host}',
        port: '5432',
        database: '${config.database}',
        username: '${config.username}',
        password: '${config.password}',
        dialect: '${config.dialect}',
        logging: false
    }
};`;
};

/**
 * Template for route.js
 */
module.exports.route = function (name) {
    return `
'use strict';

module.exports = function (component, application) {

    return {
        '/${name}': {
            get: {
                handler: component.controllers.index
            }
        }
    }

};`;
};

/**
 * Template for route.js (API features)
 */
module.exports.routeApi = function (name) {
    return `
'use strict';

module.exports = function (component, application) {

    let controllers = component.controllers;

    return {
        '/${name}/apis': {
            get: {
                handler: controllers.index
            }
        },
        '/${name}': {
            get: {
                handler: controllers.list
            }
        },
        '/${name}/create': {
            post: {
                handler: controllers.create
            }
        },
        '/${name}/:id([0-9]+)': {
            get: {
                handler: controllers.read
            },
            put: {
                handler: controllers.update
            },
            delete: {
                handler: controllers.delete
            }
        }
    }

};`;
};

/**
 * Template for controller (API features)
 */
module.exports.controllerApi = function (name) {
    return `
'use strict';

module.exports = function (controller, component, application) {

    let ${name}Model = application.models.${name};

    /**
     * List apis
     */
    controller.index = function (req, res) {
        res.render('index');
    };

    /**
     * List ${name}
     */
    controller.list = function (req, res) {
        ${name}Model.findAll({
            raw: true
        }).then(function (items) {
            res.send({
                status: 'success',
                msg: 'List all ${name}',
                data: items
            });
        }).catch(function(error){
            res.send({
                status: 'error',
                msg: error
            });
        });
    };

    /**
     * Create ${name}
     */
    controller.create = function (req, res) {
        ${name}Model.create(req.body).then(function (${name}) {
            res.send({
                status: 'success',
                msg: 'Create ${name} successfully'
            });
        }).catch(function(error){
            res.send({
                status: 'error',
                msg: error
            });
        });
    };

    /**
     * Read ${name}
     */
    controller.read = function (req, res) {
        ${name}Model.findById(req.params.id).then(function (${name}) {
            res.send({
                status: 'success',
                msg: 'Detail of ${name} with id = ' + req.params.id,
                data: ${name}
            });
        }).catch(function(error){
            res.send({
                status: 'error',
                msg: error
            });
        });
    };

    /**
     * Update ${name}
     */
    controller.update = function (req, res) {
        ${name}Model.findById(req.params.id).then(function (${name}) {
            return ${name}.updateAttributes(req.body);
        }).then(function (${name}) {
            res.send({
                status: 'success',
                msg: 'Update ${name} successfully'
            });
        }).catch(function(error){
            res.send({
                status: 'error',
                msg: error
            });
        });
    };

    /**
     * Delete ${name}
     */
    controller.delete = function (req, res) {
        ${name}Model.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.send({
                status: 'success',
                msg: 'Delete successfully'
            });
        }).catch(function(error){
            res.send({
                status: 'error',
                msg: error
            });
        });
    };

};`;
};

/**
 * Template for model
 */
module.exports.model = function (name, modelProperies) {
    return `
'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('${name}', {
        ${modelProperies}
    }, {
        timestamps: false,
        tableName: '${name}'
    });

};`;
};
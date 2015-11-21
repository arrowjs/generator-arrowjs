'use strict';

module.exports = function (component, application) {

    let controller = component.controllers;

    return {
        "/": {
            get: {
                handler: controller.index
            }
        }
    };

};
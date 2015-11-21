'use strict';

/**
 * Validate property name
 */
exports.validatePropertyName = function (name) {
    if (name.match(/[\/@\s\+%:\.]/) ||
        name !== encodeURIComponent(name)) {
        return 'Property name cannot contain special characters (/@+%:. ). Try again.';
    }
    if(name !== encodeURIComponent(name)) {
        return 'Property name cannot contain special characters escaped by encodeURIComponent. Try again.';
    }
    if(name == 'id') {
        return 'Property "id" was used as Primary key. Try again.';
    }
    return true;
};
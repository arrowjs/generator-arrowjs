'use strict';

/**
 * Call prompt like Promise
 */
module.exports.promptAsync = function (base, prompts) {
    return new Promise(function (fulfill, reject) {
        base.prompt(prompts, function (props, err) {
            if (err)
                reject(err);
            else
                fulfill(props);
        })
    });
};
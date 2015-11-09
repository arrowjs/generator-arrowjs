"use strict";

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("user", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        email: {
            type : DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'users'
    });
    return User;
};
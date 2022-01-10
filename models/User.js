'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static classLevelMethod() {
        return 'Hellow';
    }
    instanceLevelmethod() {
        return 'there';
    }
    getFullName() {
        return [this.firstName, this.lastName].join(' ');
    }
  };
  User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    role: DataTypes.STRING
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'User',
  });
  return User;
};
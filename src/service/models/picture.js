/*
  Create model for pictures of article
  Structure of table:
  id - unique identity number (automatically created by the database)
  src - url of picture (created as a response when created by the user)

  linking to the article model - one-to-many
 */

"use strict";

const {DataTypes, Model} = require(`sequelize`);

// Data model inherits from class Model from sequelize library
class Picture extends Model {}

// define - initializes the data model of Picture and export it
const define = (sequelize) => Picture.init({
  src: {
    type: DataTypes.STRING,
  }
}, {
  sequelize, // Pass the connection instance
  modelName: `Picture`, // Defines the name of the data model
  tableName: `pictures`, // Defines the name of the table in database
});

module.exports = define;

/*
  Create model for categories of article
  Structure of table:
  id - unique identity number (automatically created by the database)
  name - name of category (created as a response when created by the user).

  linking to the article model - many-to-many
 */
"use strict";

const {DataTypes, Model} = require(`sequelize`);

// Data model inherits from class Model from sequelize library
class Category extends Model {}

// define - initializes the data model of Category and export it
const define = (sequelize) => Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize, // Pass the connection instance
  modelName: `Category`, // Defines the name of the data model
  tableName: `categories`, // Defines the name of the table in database
});

module.exports = define;

/*
  Create model for comments of article
  Structure of table:
  id - unique identity number (automatically created by the database)
  text - text of comment (created as a response when created by the user)

  linking to the article model - one-to-many
 */

"use strict";

const {DataTypes, Model} = require(`sequelize`);

// Data model inherits from class Model from sequelize library
class Comment extends Model {}

// define - initializes the data model of Comment and export it
const define = (sequelize) => Comment.init({
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize, // Pass the connection instance
  modelName: `Comment`, // Defines the name of the data model
  tableName: `comments`, // Defines the name of the table in database
});

module.exports = define;

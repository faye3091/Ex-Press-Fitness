const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Workout extends Model {}

//sets up the workout model to associate with index.js

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body_part: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    repetitions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "workout",
  }
);
module.exports = Workout;

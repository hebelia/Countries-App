const { DataTypes } = require("sequelize");

// we inject the connection to sequelize
module.exports = (sequelize) => {
  // defining models for the db
  //activity model
  sequelize.define("Activity", {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    duration: {
      //hours
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    season: {
      //seasons
      type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
      allowNull: false,
    },
  });
};
//since we only export the module as a file , when importing it we need to

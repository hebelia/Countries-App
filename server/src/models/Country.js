const { DataTypes } = require("sequelize");

// we inject the connection to sequelize
module.exports = (sequelize) => {
  // defining models for the db
  //country model
  sequelize.define("Country", {
    ID: {
      //string length 3
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      //img url
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      // allowNull: true,
    },
    area: {
      //FLOAT for the area
      type: DataTypes.FLOAT, 
      // allowNull: true,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

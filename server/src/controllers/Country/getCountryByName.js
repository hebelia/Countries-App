// dependencies
const { Op } = require("sequelize");
const { Country, Activity } = require("../../db");

//async function to get countries by name
const getCountryByName = async (name) => {
  try {
    // sequelize  findAll method -> retrieve countries with a name matching the provided pattern
    const filteredCountry = await Country.findAll({
      //a condition is specified in the WHERE object to find countries whose name contains the string specified in the name parameter
      where: {
        name: {
          // case-insensitive 'iLike' operator to search for names containing the provided string
          [Op.iLike]: `%${name}%`,
        },
      },
      //when we search for a country by id, we will see the activities associated with that country thanks to the ManyToMany relationship and the 'include:' attribute
      include: {
        model: Activity,
        // we specify which attributes we want to include from the model in an array of strings
        attributes: ["name", "difficulty", "duration", "season"],
        // we specify that we do not want to include the attributes of the join table
        // through: { attributes: [] },
      },
    });

    // if any countries were found found,
    return filteredCountry.length > 0
      ? // return the array of countries
        filteredCountry
      : // otherwise throw an error indicating country not found
        new Error("Country not found");
  } catch (error) {
    throw error;
  }
};

module.exports = { getCountryByName };

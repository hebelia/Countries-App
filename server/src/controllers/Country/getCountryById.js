const { Country, Activity } = require("../../db");
//define function to export
const getCountryById = async (id) => {
  try {
    // findOne -> Country model -> sequelize
    const country = await Country.findOne({
      where: { ID: id },
      //when we search for a country by id, we will see the activities associated with that country thanks to the ManyToMany relationship and the 'include:' attribute
      include: {
        model: Activity,
        // we specify which attributes we want to include from the model in an array of strings
        attributes: ["name", "difficulty", "duration", "season"],
        // we specify that we do not want to include the attributes of the join table
        // through: { attributes: [] },
      },
    });
    // console.log("Country found:", country);
    //return the constant with all the data we requested
    return country;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCountryById,
};

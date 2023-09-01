// model dependencies
const { Activity, Country } = require("../../db");
//async function
const getActivities = async () => {
  //NOTE CHANGE TO MAKE GET WORK

  try {
    // activity model to fetch activities
    const activities = await Activity.findAll({
      include: {
        // join the country model to the query
        model: Country, //
        // alias for the relationship with country
        as: "Countries", //
        // select only the "id" and "name" columns from "Country"
        attributes: ["ID", "name"],
        // does not select columns from the intermediate table
        through: { attributes: [] }, //
      },
    });
    // query results containing activities with associated countries
    return activities;
  } catch (error) {
    console.error("Error in getActivities:", error.message);
    throw Error;
  }
};

module.exports = {
  getActivities,
};

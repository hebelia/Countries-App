// model dependencies
const { Activity } = require("../../db");

// async function to create an activity with related countries
const postActivity = async (name, difficulty, duration, season, countries) => {
  // create a new activity in the database using provided parameters
  const activity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });

  // add related countries to the activity if countries array has entries
  if (countries.length >= 1) {
    //
    activity.addCountries(countries);
  }

  // checks if activity was created successfully, throw an error if not
  if (!activity) {
    throw new Error(`Activity not created with the name: ${name}`);
  }
  // created activity object
  return activity;
};

module.exports = {
  postActivity,
};

/* 
association between models ->  Sequelize provides methods 
relationships between INSTANCES of those models 

-> addCountries method -> establish a MANY-TO-MANY relationship between an Activity instance and one or more Country instances ( set up in db.js file)



addAssociatedModel:Method Availability: When you define a many-to-many association, Sequelize automatically generates various methods for managing the relationship. One of these methods is add`AssociatedModel` , which is used to associate related instances.


*/

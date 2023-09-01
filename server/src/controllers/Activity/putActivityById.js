// model dependencies
const { Activity } = require("../../db");

//async function
const putActivityById = async (id, updatedData) => {
  try {
    // sequelize method frind by primary key
    // store it in a constant
    const activity = await Activity.findByPk(id);
    if (!activity) throw new Error("Invalid id");

    // update activity properties with updatedData
    if (updatedData.name) activity.name = updatedData.name;
    if (updatedData.difficulty) activity.difficulty = updatedData.difficulty;
    if (updatedData.duration) activity.duration = updatedData.duration;
    if (updatedData.season) activity.season = updatedData.season;

    //method to save the changes
    await activity.save();

    //return the updated activity
    return activity;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  putActivityById,
};

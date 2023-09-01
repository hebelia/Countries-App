//dependencies
const { Activity } = require("../../db");

const deleteActivityById = async (id) => {
  try {
    // find the activity by primary key method
    const activity = await Activity.findByPk(id);

    // check if the activity exists
    if (!activity) throw new Error("Activity doesn't exist.");

    // delete the activity
    await activity.destroy();

    // return a success message
    return { msg: "Activity deleted correctly." };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  deleteActivityById,
};

const { Router } = require("express");
// controllers
const { postActivity } = require("../controllers/Activity/postActivity");
const { getActivities } = require("../controllers/Activity/getActivities");
const { putActivityById } = require("../controllers/Activity/putActivityById");
const {
  deleteActivityById,
} = require("../controllers/Activity/deleteActivityById");

//define route
const activityRoute = Router();

// POST route for /activities -> gets the request body data (name, season...). performs some transformations on the data and calls the postActivity function to create a new activity
activityRoute.post("/", async (req, res) => {
  try {
    //destructuring the activity data from the request body
    const { name, difficulty, duration, season, countries } = req.body;
    //name and season cannot be null
    if (!name || !difficulty || !season || !countries)
      throw new Error("Required fields are missing or empty");
    else {
      //await the postActivity function/controller
      const new_activity = await postActivity(
        name,
        difficulty,
        duration,
        season,
        countries
      );
      return res.status(200).json(new_activity);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET route for /activities. Call the getActivity function and return all activities
activityRoute.get("/", async (req, res) => {
  try {
    //await for the resolution of getActivity function/controller
    const activities = await getActivities();
    res.status(200).send(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//to update an activity by id you need to previously know the activity id
activityRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  // bring the updated data from the request body
  const updatedData = req.body;
  try {
    const updatedActivity = await putActivityById(id, updatedData);
    return res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//to DELETE an activity by id you need to previously know the activity id
//NOTE: every time you delete an activity that id no longer exists on the db so when a new activity is created it will have another id (autoincrement)
activityRoute.delete("/:id", async (req, res) => {
  // destructure the activity id from the URL params

  const { id } = req.params;
  try {
    // call the 'deleteActivityById' controller with the id
    const result = await deleteActivityById(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { activityRoute };

// activityRoute.put("/:id", async (req, res) => {});

// activityRoute.delete("/:id", async (req, res) => {});

// activityRoute.delete('/:id', async (req, res, next) => {
//   const { id } = req.params;
//   try {
//       const activity = await Activity.destroy({ where: { id } });
//       if (activity > 0) return res.send({ msg: "Activity deleted correctly." });
//       res.send({ msg: "Activity doesn't exists" });
//   } catch (error) {
//       next(error);
//   }
// });

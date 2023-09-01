const { Router } = require("express");
// controllers
const { postActivity } = require("../controllers/Activity/postActivity");
const { getActivity } = require("../controllers/Activity/getActivity");
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
    const activities = await getActivity();
    res.status(200).send(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { activityRoute };

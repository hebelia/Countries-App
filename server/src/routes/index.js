const { Router } = require("express");
// import the subrouters from each file
const { countryRoute } = require("./countryRoute.js");
const { activityRoute } = require("./activityRoute.js");


const router = Router();

//define two subroutes - modularization
router.use("/countries", countryRoute);
router.use("/activity", activityRoute);


// const { getCountries } = require("../controllers/Country/getCountries.js");
// router.get("/countries", getCountries);

module.exports = router;

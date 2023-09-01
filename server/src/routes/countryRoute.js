const { Router } = require("express");
//controllers
const { getCountries } = require("../controllers/Country/getCountries");
const { getCountryById } = require("../controllers/Country/getCountryById");
const { getCountryByName } = require("../controllers/Country/getCountryByName");

// create a router instance for the subroute
const countryRoute = Router();

//  route to get all countries
//async - await
countryRoute.get("/", async (req, res) => {
  try {
    // call the getCountries controller to fetch all countries
    const allCountries = await getCountries();
    //returns json
    res.status(200).json(allCountries);
  } catch (error) {
    //error handling
    res.status(500).json({ error: error.message });
  }
});
//define get country by name route
countryRoute.get("/name", async (req, res) => {
  const { name } = req.query;
  try {
    // calls the getCountryByName controller to fetch countries by name
    const filteredCountry = await getCountryByName(name);
    if (filteredCountry.length > 0) {
      //  if successful -> returns the filtered countries as JSON response
      res.status(200).json(filteredCountry);
    } else {
      // length = 0 -> status 404 -> no countries are found
      res.status(404).json({ message: "No countries found" });
    }
  } catch (error) {
    //error handling
    return res.status(404).json({ error: error.message });
  }
});

countryRoute.get("/:id", async (req, res) => {
  //define a get route to /countries/:id where :id is a param variable in the URL. call the getCountryById function/controller and return a country corresponding to the given id
  const { id } = req.params;

  try {
    //awaits for the resolution of getCountryById function
    //toUpperCase() is used to convert a string to uppercase
    //make sure that the ID is matched correctly against the IDs stored in the database, since the string match is case sensitive
    const upperCaseId = id.toUpperCase();
    // console.log("Requested Country ID:", id);
    // console.log("Converted Country ID (uppercase):", upperCaseId);
    const country = await getCountryById(upperCaseId);
    console.log("Country in route:", country);
    res.status(200).json(country);
  } catch (error) {
    //error handling
    // console.log(error.message);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { countryRoute };

/*
params -> does not modify the route itself -> if the name IS provided in the route by query params, the response will be the filtered country generated by the getCountryByName function/controller on a json object with a 200 status code

 -> if the name is NOT provided, the response will be all the countries generated by the getCountries function/controller on a json object with a 200 status code.

->if an error occurs when calling either the getCountries() or getCountryByName(name) functions, the route returns a JSON response with a 500 status code and an error message.
*/

//  // }
//otherwise
// else {
//   try {

//     //returns the country filtered by name
//     const filteredCountry = await getCountryByName(name);
//     if (filteredCountry.length > 0) {
//       res.status(200).json(filteredCountry);
//     } else {
//       //error handling
//       res.status(404).json({ message: "No countries found" });
//     }
//   } catch (error) {
//     //error handling
//     return res.status(404).json({ error: error.message });
//   }
// }

// const { name } = req.query;
//if name is not provided in the request -> returns all countries

// if (!name) {
//error handling

const axios = require("axios");
const { Country } = require("../../db");

// async controller function
const getCountries = async () => {
  const URL = "http://localhost:5000/countries";

  try {
    // GET request -> fetch country data from URL
    const { data } = await axios(URL);
    // process and create countries based on the fetched data
    const countries = await Promise.all(
      data.map(async (element) => {
        // findOrCreate of Country model -> sequelize
        const [countryInstance, created] = await Country.findOrCreate({
          where: {
            ID: element.cca3,
          },
          defaults: {
            ID: element.cca3,
            name: element.name.common,
            flag: element.flags.png,
            continent: element.continents[0],
            capital: element.capital ? element.capital[0] : "No Data",
            subregion: element.subregion,
            area: element.area ? element.area.toString() : "No Data",
            population: element.population,
          },
        });
        // log whether a new country was created or not
        console.log(`Country with ID ${element.cca3} created: ${created}`);
        // return the processed country
        return countryInstance;
      })
    );
    // return the array of country instances
    return countries;
  } catch (error) {
    throw error;
  }
};

module.exports = { getCountries };

// const axios = require("axios");
// const { Country } = require("../../db");

// //define function that gets countries from external API
// const getCountries = async () => {
//   const URL = "http://localhost:5000/countries";

//   try {
//     // GET request -> fetch country data
//     const { data } = await axios(URL);

//     //process and create countries based on the fetched data
//     let countries = await Promise.all(
//       //asynchronously process the fetched data for each country
//       data.map(async (element) => {
//         const country = {
//           ID: element.cca3,
//           name: element.name.common,
//           flag: element.flags.png,
//           continent: element.continents[0],
//           capital: element.capital ? element.capital[0] : "No Data",
//           subregion: element.subregion,
//           area: element.area ? element.area.toString() : "No Data",
//           population: element.population,
//         };
//         // findOrCreate of Country model -> sequelize
//         Country.findOrCreate({
//           // send the corresponding properties to find a country where all these exist , else create it
//           where: {
//             ID: element.cca3,
//             name: element.name.common,
//             flag: element.flags.png,
//             continent: element.continents[0],
//             capital: element.capital ? element.capital[0] : "No Data",
//             subregion: element.subregion,
//             area: element.area ? element.area.toString() : "No Data",
//             population: element.population,
//           },
//         });
//         //return the processed country
//         return country;
//       })
//     );
//     //return the array that now contains all mapped countries
//     return countries;
//     //error handling
//   } catch (error) {
//     return error;
//   }
// };

// module.exports = { getCountries };

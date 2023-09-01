const axios = require("axios");
//extra modularization so that an infinite loop is not generated with the tests
const server = require("./src/server");
//database connection
const { conn } = require("./src/db.js");
const PORT = 3001;
//database connection sync
conn
  .sync({ 
    // force: true 
    force:false
  })
  .then(() => {
    //listen
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

  // conn
  // .sync({ force: true })
  // .then(() => {
  //   server.listen(PORT, async () => {
  //     console.log(`Server listening on port ${PORT}`);
  //     const { data } = await axios.get("http://localhost:5000/countries");
  //     data.map(async (element) => {
  //       await Country.findOrCreate({
  //         where: {
  //           ID: element.cca3,
  //         },

  //         defaults: {
  //           name: element.name.common,
  //           flag: element.flags.png,
  //           continent: element.continents
  //             ? element.continents[0]
  //             : "undefined",
  //           capital: element.capital ? element.capital[0] : "undefined",
  //           subregion: element.subregion,
  //           area: element.area,
  //           population: element.population,
  //         },
  //       });
  //     });
  //   });
  // })
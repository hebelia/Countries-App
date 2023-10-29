import { NavLink } from "react-router-dom";

import Card from "../../Card/Card";

import style from "./AllCountries.module.scss";
//dumb component that renders all the countries depending on the limit that is recieved by props from the Cards component
const AllCountries = ({ filteredCountries, limit }) => {
  const countries = [];

  // looping through the filteredCountries based on 'limit' to extract a subset of countries
  for (let i = limit.min; i <= limit.max; i++) {
    const country = filteredCountries[i];
    if (!country) break; // break if no more countries are available in the range
    countries.push(country); // adding the country to the 'countries' array
  }

  return (
    <div
      className={
        filteredCountries[0].error ? style.errorContainer : style.cardsContainer
      }
    >
      <>
        {" "}
        {filteredCountries[0]?.error ? (
          // if no country was found (for example in case the combination of filters makes the array be empty - activity + continent -)
          <div>
            <h3 className={style.countryDontFoundTitle}>
              No country found (；′⌒`)
              <p>Try something else!</p>
            </h3>
          </div>
        ) : (
          // if the cpuntry does exist
          countries.map((country) => {
            console.log(country);
            return (
              <div key={country.ID} className={style.cardCointaner}>
                {/* link to the detail page with dynamic id of the country*/}
                <NavLink to={`/detail/${country.ID}`}>
                  {/* card component with country details */}
                  <Card
                    name={country.name}
                    continent={country.continent}
                    flag={country.flag}
                  />
                </NavLink>
              </div>
            );
          })
        )}
      </>
    </div>
  );
};

export default AllCountries;

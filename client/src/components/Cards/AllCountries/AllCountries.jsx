import { NavLink } from "react-router-dom";

import Card from "../../Card/Card";

import style from "./AllCountries.module.scss";

const AllCountries = ({ filteredCountries, limit }) => {
  const countries = [];

  for (let i = limit.min; i <= limit.max; i++) {
    const country = filteredCountries[i];
    if (!country) break;
    countries.push(country);
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
          // if no country was found
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
                <NavLink to={`/detail/${country.ID}`}>
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

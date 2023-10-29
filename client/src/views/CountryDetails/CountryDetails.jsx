import { useEffect, useRef, useState } from "react"; // React hooks
import { useSelector, useDispatch } from "react-redux"; //  Redux hooks
import { NavLink, useParams, useNavigate } from "react-router-dom"; //  React Router hooks

import Loading from "../../components/Loading/Loading"; // loading component

import {
  cleanCountryId,
  getCountries,
  getCountryById,
} from "./../../redux/actions/countries"; // redux actions

import { difficulties, subregions } from "../../utils/utils"; // utility functions

import style from "./CountryDetails.module.scss"; // scss modules

//imported icons
import {
  IconContinent,
  IconAmerica,
  IconAsia,
  IconAfrica,
  IconEurope,
  IconOceania,
  IconElse,
  IconPopulation,
  IconCapital,
  IconArea,
} from "../../assets/CountryIcons";

// defining functional component
const CountryDetails = () => {
  const dispatch = useDispatch(); // initialize useDispatch hook to dispatch Redux actions
  const navigate = useNavigate(); // initialize useNavigate hook to navigate between routes

  const params = useParams(); // get the url parameters using useParams
  const country = useSelector((state) => state.countries.countryById); // get the selected country from Redux store
  const allCountries = useSelector((state) => state.countries.countries); // ghet all countries from Redux store
  const [infoCountry, setInfoCountry] = useState({}); // initialize state to store country information

  const moreInfo = useRef(); // create a ref for additional information
  const moreInfoContainer = useRef(); // create a ref for the container of additional information

  const [randomCountry, setRandomCountry] = useState(false); // initialize state for random country selection

  // utility function to format a number with thousands separators
  const formatNumber = (num) => {
    let str = num.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  };

  // function to select a random country and navigate to its details page
  const randomPage = () => {
    setRandomCountry(true); // set randomCountry flag to true
    if (!allCountries.length) return dispatch(getCountries()); // fetch countries if not loaded
    const max = allCountries.length - 1;
    const numRandom = Math.round(Math.random() * max);
    const country = allCountries[numRandom];
    window.scroll({
      top: 0,
      left: 0,
    });
    // clean the selected country id in Redux store
    dispatch(cleanCountryId());
    // navigate to the details page of the random country
    navigate(`/details/${country.ID}`);
  };

  // function to handle the click event on the country flag button
  const handleBtnImg = () => {
    // add CSS class for animation
    moreInfoContainer.current.classList.add(style.animationFlag);
    // add CSS class to display additional information
    moreInfo.current.classList.add(style.display);
  };

  // function to close the additional information
  const closeMoreInfo = () => {
    // remove CSS class to hide additional information
    moreInfo.current.classList.remove(style.display);
    // remove CSS class for animation
    moreInfoContainer.current.classList.remove(style.animationFlag);
  };

  useEffect(() => {
    if (randomCountry) {
      // call the randomPage function when randomCountry changes
      randomPage();
    }
  }, [allCountries]); // run this effect when allCountries changes

  useEffect(() => {
    if (!country.data) dispatch(getCountryById(params.id));
    // fetch country details if not available
    else {
      // handle error case
      if (country.data.error) return setInfoCountry({ ...country.data });
      // set subregion to "Antarctica" if missing
      if (!country.data.subregion) country.data.subregion = "Antarctica";
      setInfoCountry({
        ...country.data,
        // map subregion to continent using subregions object
        continent: subregions[country.data.subregion],
      });
    }
  }, [country, params]); // run this effect when country or params change

  useEffect(() => {
    window.scroll({
      top: 0,
    });

    return () => {
      // clean the selected country id when unmounting the component
      dispatch(cleanCountryId());
    };
  }, []); // run this effect on component mount and unmount

  return (
    <div className={style.container}>
      <div
        className={
          infoCountry.error ? `${style.errorContainer}` : style.infoContainer
        }
      >
        {infoCountry.error ? (
          // display an error message if infoCountry.error is true
          <h3 className={style.titleError}>
            There is no country with this ID =(
          </h3>
        ) : infoCountry.ID ? (
          // display country information if infoCountry.ID exists
          <>
            <div className={style.containerTitleInfo}>
              <div className={style.containerTitleFlag}>
                <div className={style.flagContainer}>
                  <button onClick={handleBtnImg} className={style.btnImg}>
                    {/* when button is clicked, calls handleBtnImg function */}
                    <img
                      src={infoCountry.flag}
                      alt={`${infoCountry.name} flag`}
                    />
                  </button>
                </div>
                <h2 className={style.countryName}>{infoCountry.name}</h2>
              </div>
              <div className={style.detailsContainer}>
                <div className={style.codeContainer}>
                  <p>{infoCountry.ID}</p>
                </div>
                <div className={style.textIconContainer}>
                  <IconContinent /> <p>Continent: {infoCountry.continent}</p>
                </div>
                <div className={style.textIconContainer}>
                  {infoCountry.continent === "America" ? (
                    <IconAmerica />
                  ) : infoCountry.continent === "Asia" ? (
                    <IconAsia />
                  ) : infoCountry.continent === "Africa" ? (
                    <IconAfrica />
                  ) : infoCountry.continent === "Europe" ? (
                    <IconEurope />
                  ) : infoCountry.continent === "Oceania" ? (
                    <IconOceania />
                  ) : (
                    <IconElse />
                  )}
                  <p>Subregion: {infoCountry.subregion}</p>
                </div>
                <div className={style.textIconContainer}>
                  <IconPopulation />
                  <p>Population: {formatNumber(infoCountry.population)}</p>
                </div>
                <div className={style.textIconContainer}>
                  <IconCapital />
                  <p>Capital: {infoCountry.capital}</p>
                </div>
                <div className={style.textIconContainer}>
                  <IconArea />
                  <p>Area: {formatNumber(infoCountry.area)} km²</p>
                </div>
              </div>
            </div>
            <div className={style.containerActivities}>
              <h3>🚩Activities</h3>
              <div>
                <div className={style.totalActivities}>
                  {infoCountry.Activities.length ? (
                    <>
                      {infoCountry.Activities.map((activity) => {
                        return (
                          <div
                            key={activity.ID}
                            className={style.activityContainer}
                          >
                            <h4>{activity.name} ↴</h4>
                            <div className={style.infoActivityContainer}>
                              <p className={style.infoText}>
                                Duration <span>{activity.duration} hs</span>
                              </p>
                              <p className={style.infoText}>
                                Season <span>{activity.season}</span>
                              </p>
                              <p className={style.infoText}>
                                Difficulty{" "}
                                <span>
                                  {difficulties[activity.difficulty - 1]}
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div>
                      <p className={style.dontFound}>
                        There are no activities for this country yet ╯︿╰
                      </p>
                    </div>
                  )}
                </div>
                <div className={style.containerAddBtn}>
                  <NavLink
                    className={style.btn}
                    to={`/form?country=${infoCountry.ID}`}
                  >
                    Add a new activity to this country!
                  </NavLink>
                </div>
              </div>
            </div>
            <div
              onClick={closeMoreInfo}
              ref={moreInfo}
              className={style.background}
            >
              <div ref={moreInfoContainer} className={style.containerMoreInfo}>
                <h2 className={style.titleMoreInfo}>{infoCountry.name}</h2>
                <img src={infoCountry.flag} alt={`${infoCountry.name} flag`} />
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default CountryDetails;

/* eslint-disable react-hooks/exhaustive-deps */ // Disable linting for exhaustive-deps rule
{
  /* generate random country */
}
{
  /* <div className={style.containerButons}>
          
          <button
            onClick={randomPage}
            className={`${style.btn} ${style.randomBtn}`}
          >
            Random Country
          </button>
        </div> */
}

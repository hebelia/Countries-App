/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { cleanActivity, createActivity } from "../../redux/actions/activities";
import { filterCountries } from "../../redux/actions/countries";

import Loading from "../../components/Loading/Loading";
import FieldActivity from "./fields/FieldActivity";

import Alert from "../../components/Alert/Alert";
import styleAlert from "../../components/Alert/Alert.module.scss";

import style from "./ActivityForm.module.scss";

const ActivityForm = () => {
  // redux dispatch function
  const dispatch = useDispatch();

  // access filtered countries and createdActivity data from the Redux store
  const countries = useSelector((state) => state.countries.filteredCountries);
  const createdActivity = useSelector((state) => state.activities.newActivity);

  // access the search parameters from the URL
  let [searchParams] = useSearchParams();

  // creates refs to DOM elements for manipulation
  const containerAlert = useRef(null);
  const containerLoading = useRef(null);
  const diffText = useRef(null);
  const inputDuration = useRef(null);
  const selectedSeason = useRef(null);
  const selectedCountries = useRef(null);
  const inputDifficulty = useRef(null);

  // initialize state for the new activity form and alert messages
  const [newActivity, setNewActivity] = useState({
    name: { text: "", error: false },
    difficulty: "1",
    duration: { hours: "", error: false },
    season: { name: "", error: false },
    countries: { all: [], error: false },
  });
  const [alertInfo, setAlertInfo] = useState({
    title: "",
    text: "",
    textBTN: "",
    type: "",
  });

  //handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, difficulty, duration, season, countries } = newActivity;
    // validate form inputs
    if (
      !name.text ||
      !difficulty ||
      !Number(duration.hours) ||
      !season.name ||
      !countries.all.length
    ) {
      // handle input validation errors and show an alert
      if (!name.text) {
        setNewActivity((state) => {
          return { ...state, name: { text: state.name.text, error: true } };
        });
      }
      if (!Number(duration.hours)) {
        setNewActivity((state) => {
          return {
            ...state,
            duration: { hours: state.duration.hours, error: true },
          };
        });
      }
      if (!season.name) {
        setNewActivity((state) => {
          return { ...state, season: { name: state.season.name, error: true } };
        });
      }
      if (!countries.all.length) {
        setNewActivity((state) => {
          return {
            ...state,
            countries: { all: state.countries.all, error: true },
          };
        });
      }
      return showAlert("Error!", "All inputs are required.", "OK", "error");
    }

    // shows loading indicator and prepares data for dispatch
    showLoading();
    const activity = {
      name: newActivity.name.text,
      difficulty: newActivity.difficulty,
      duration: newActivity.duration.hours,
      season: newActivity.season.name,
      countries: newActivity.countries.all,
    };
    // dispatch an action to create the activity
    dispatch(createActivity(activity));
  };

  // clear  form function
  const clearForm = () => {
    // resets the form state and selected options
    setNewActivity({
      name: { text: "", error: false },
      difficulty: "1",
      duration: { hours: "", error: false },
      season: { name: "", error: false },
      countries: { all: [], error: false },
    });
    selectedSeason.current.selectedIndex = 0;
    selectedCountries.current.selectedIndex = 0;
    inputDifficulty.current.value = 1;
    // resets the label difficulty to easy for the input type range
    changeLblDifficulty(1);
  };

  // loading indicator function
  const showLoading = () => {
    containerLoading.current.classList.add(style.display);
  };

  // handle change functions to all the input elements
  const handleChangeName = (e) => {
    const value = e.target.value;
    if (!value) {
      setNewActivity((state) => {
        return { ...state, name: { text: value, error: true } };
      });
      return;
    }
    setNewActivity((state) => {
      return { ...state, name: { text: value, error: false } };
    });
  };
  // change the displayed difficulty label (used earlier)
  const handleChangeDifficulty = (e) => {
    const difficulty = e.target.value;
    setNewActivity((state) => {
      return { ...state, difficulty };
    });
    changeLblDifficulty(difficulty);
  };
  // styles for the difficulty change
  const changeLblDifficulty = (difficulty) => {
    const difficulties = [
      { name: "Begginer", className: style.veryEasy },
      { name: "Amateur", className: style.easy },
      { name: "Normal", className: style.normal },
      { name: "Professional", className: style.hard },
      { name: "Expert", className: style.extreme },
    ];
    diffText.current.innerText = difficulties[difficulty - 1].name;
    diffText.current.className = difficulties[difficulty - 1].className;
  };

  const hanldeChangeDuration = (e) => {
    const value = e.target.value;
    if (!value) {
      return setNewActivity((state) => {
        return { ...state, duration: { hours: value, error: true } };
      });
    }
    setNewActivity((state) => {
      return { ...state, duration: { hours: value, error: false } };
    });
  };

  const hanldeSeasonChange = (e) => {
    const value = e.target.value;
    setNewActivity((state) => {
      return { ...state, season: { name: value, error: false } };
    });
  };
  // selecting a country
  const handleCountrySelect = (e) => {
    const country = e.target.value;
    const existsCountry = newActivity.countries.all.find((c) => c === country);
    if (existsCountry)
      return showAlert(
        "Error!",
        "You can't add the same country twice.",
        "OK",
        "error"
      );
    setNewActivity((state) => {
      return {
        ...state,
        countries: {
          all: [...newActivity.countries.all, country],
          error: false,
        },
      };
    });
  };

  const handleRemoveClick = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const countries = newActivity.countries.all.filter((c) => c !== id);
    setNewActivity((state) => {
      return { ...state, countries: { all: countries, error: false } };
    });
  };

  //prevents typing letters on duration
  const dontAllowLeters = (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  };

  const showAlert = (title, text, textBTN, type) => {
    setAlertInfo({ title, text, textBTN, type, showed: true });
  };

  // validate and limit the duration input value
  useEffect(() => {
    if (newActivity.duration.hours > 24)
      setNewActivity((state) => {
        return { ...state, duration: { hours: 24, error: false } };
      });
    if (newActivity.duration.hours < 0)
      setNewActivity((state) => {
        return { ...state, duration: { hours: 0, error: false } };
      });
  }, [newActivity.duration.hours]);

  // shows the alert message
  useEffect(() => {
    if (alertInfo.showed) {
      const alert = containerAlert.current.children[0];
      containerAlert.current.classList.add(style.showVisibility);
      alert.classList.add(`${styleAlert.openPopUp}`);
    }
  }, [alertInfo]);

  // handles the created activity and error messages
  useEffect(() => {
    if (createdActivity.created) {
      containerLoading.current.classList.remove(style.display);
      showAlert(
        "Activity Created",
        "Activity has been created successfully ヾ(≧ ▽ ≦)ゝ",
        "OK",
        "success"
      );
      clearForm();
      // dispatch(cleanActivity()); //this prevents the alert from appearing when the page is UPDATE in development mode
    } else if (createdActivity.info.error) {
      containerLoading.current.classList.remove(style.display);
      showAlert("Error", createdActivity.info.error, "OK", "error");
    }
  }, [createdActivity]);


  // handle the query parameter for country selection
  useEffect(() => {
    const queryCountry = searchParams.get("country");
    if (queryCountry && countries?.length) {
      const country = countries.find((c) => c.id === queryCountry);
      if (country)
        setNewActivity((state) => {
          return { ...state, countries: { all: [queryCountry], error: false } };
        });
    }
  }, [countries]);

  useEffect(() => {
    dispatch(filterCountries({ order: "ASC_ALPHABETICALLY" }));
    return () => {
      dispatch(cleanActivity());
    };
  }, []);

  return (
    <>
      <div ref={containerLoading} className={style.containerLoading}>
        <Loading />
      </div>
      <div className={style.container}>
        <div className={style.infoContainer}>
          <div className={style.titleContainer}>
            <h3 className={style.title}>&gt;_ New Activity</h3>
          </div>
          <form action="" method="post" onSubmit={handleOnSubmit}>
            <FieldActivity
              field={newActivity.name}
              id="name"
              text="Name"
              textWrong="Please, type a name for the activity"
            >
              <input
                autoComplete="off"
                value={newActivity.name.text}
                onChange={handleChangeName}
                type="text"
                placeholder="Name"
                id="name"
              />
            </FieldActivity>

            <div className={style.containerInput}>
              <label className={style.label} htmlFor="difficulty">
                Difficulty
              </label>
              <input
                ref={inputDifficulty}
                defaultValue={1}
                onChange={handleChangeDifficulty}
                id="difficulty"
                type="range"
                min="1"
                max="5"
              />
              <p ref={diffText} className={style.veryEasy}>
                Begginer
              </p>
            </div>

            <FieldActivity
              field={newActivity.duration}
              id="duration"
              text="Duration in hours (Max: 24)"
              textWrong="Please, type a duration for the activity"
            >
              <input
                value={newActivity.duration.hours}
                ref={inputDuration}
                className={style.durationInput}
                onKeyPress={dontAllowLeters}
                onChange={hanldeChangeDuration}
                min={0}
                max={24}
                type="number"
                placeholder="Duration"
                id="duration"
              />
            </FieldActivity>

            <FieldActivity
              field={newActivity.season}
              id="season"
              text="Season"
              textWrong="Please, choose a season for the activity"
            >
              <select
                ref={selectedSeason}
                className={style.select}
                onChange={hanldeSeasonChange}
                defaultValue={"None"}
                name="continent"
                id="continent"
              >
                <option disabled value="None">
                  Select Season
                </option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
            </FieldActivity>

            <FieldActivity
              field={newActivity.countries}
              id="countries"
              text="Select a Country"
              textWrong="Please, choose at least one country for the activity"
            >
              <select
                ref={selectedCountries}
                className={style.select}
                onChange={handleCountrySelect}
                defaultValue={"None"}
                name="countries"
                id="countries"
              >
                <option disabled value="None">
                  Select a Country
                </option>
                {countries?.map((country) => {
                  return (
                    <option key={country.ID} value={country.ID}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
              <div>
                <div className={style.containerSelectedCountries}>
                  <h4>Selected Countries</h4>
                  <div className={style.selectedCountries}>
                    {newActivity.countries.all.length ? (
                      <div className={style.listCountriesContainer}>
                        {newActivity.countries?.all.map((country) => {
                          const actualCountry = countries?.find(
                            (c) => c.ID === country
                          );
                          if (actualCountry) {
                            return (
                              <div
                                key={actualCountry.ID}
                                className={style.actualCountriesContainer}
                              >
                                <a
                                  href="#"
                                  onClick={handleRemoveClick}
                                  id={actualCountry.ID}
                                  className={`${style.btnX}`}
                                >
                                  &times;
                                </a>
                                <img
                                  src={actualCountry.flag}
                                  alt={`${actualCountry.ID} flag`}
                                />
                                <span>{actualCountry.ID}</span>
                              </div>
                            );
                          }
                          return (
                            <div
                              className={style.actualCountriesContainer}
                            ></div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className={style.noneCountry}>None</p>
                    )}
                  </div>
                </div>
              </div>
            </FieldActivity>

            <div className={style.containerButton}>
              <button className={style.btn} type="submit">
                Create Activity
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={style.backgroundAlert} ref={containerAlert}>
        <Alert
          title={alertInfo.title}
          text={alertInfo.text}
          textBTN={alertInfo.textBTN}
          type={alertInfo.type}
          background={containerAlert}
        />
      </div>
    </>
  );
};

export default ActivityForm;

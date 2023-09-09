/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { filterCountries } from "../../redux/actions/countries";

import style from "./SideBar.module.scss";
import { useFetchActivities } from "./../../hooks/useFetchActivities";
import FieldsSideBar from "./Fields/FieldsSideBar";

const SideBar = () => {
  const dispatch = useDispatch();
  const [actualFilters, setActualFilters] = useState({
    name: "",
    order: "", // este hace referencia a alfabeticamente y por poblacion
    continent: "",
    activity: "",
  });
  const [searchedCountry, setSearchedCountry] = useState({ value: "" });

  // const activities = useSelector(state => state.activities.activities);
  const { activities } = useFetchActivities();

  const asideContainer = useRef(null);
  const orderAlphabetically = useRef(null);
  const orderContinent = useRef(null);
  const orderPopulation = useRef(null);
  const orderActivity = useRef(null);

  const clearFilters = () => {
    asideContainer.current.classList.toggle(style.showContainer);
  };

  const handleShowFilters = (e) => {
    e.preventDefault();
    asideContainer.current.classList.toggle(style.showContainer);
  };

  const handleClearFilters = () => {
    setSearchedCountry({ value: "" });
    orderContinent.current.selectedIndex = 0;
    orderAlphabetically.current.selectedIndex = 0;
    orderPopulation.current.selectedIndex = 0;
    orderActivity.current.selectedIndex = 0;
    setActualFilters({ name: "", order: "", continent: "", activity: "" });
    clearFilters();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    clearFilters();
    setActualFilters((state) => {
      return { ...state, name: searchedCountry.value.trim() };
    });
  };

  const handleInputChange = (e) => {
    setSearchedCountry({ value: e.target.value });
  };

  const handleContinentSelect = (e) => {
    clearFilters();
    setActualFilters((state) => {
      return { ...state, continent: e.target.value };
    });
  };

  const handleAlphabeticallySelect = (e) => {
    clearFilters();
    let order = "None";
    if (e.target.value === "Z-A") order = "DES_ALPHABETICALLY";
    else if (e.target.value === "A-Z") order = "ASC_ALPHABETICALLY";
    orderPopulation.current.selectedIndex = 0;
    setActualFilters((state) => {
      return { ...state, order };
    });
  };

  const handlePopulationSelect = (e) => {
    clearFilters();
    let order = "None";
    if (e.target.value === "Descendent") order = "DES_POPULATION";
    else if (e.target.value === "Ascendent") order = "ASC_POPULATION";
    orderAlphabetically.current.selectedIndex = 0;
    setActualFilters((state) => {
      return { ...state, order };
    });
  };

  const handleActivitySelect = (e) => {
    clearFilters();
    setActualFilters((state) => {
      return { ...state, activity: e.target.value };
    });
  };

  useEffect(() => {
    dispatch(filterCountries(actualFilters));
  }, [actualFilters]);

  return (
    <>
      <div className={style.btnMenuFilters}>
        <a onClick={handleShowFilters} href="#">
          <i className={`fa-solid fa-filter ${style.icon}`}></i>Filters
        </a>
      </div>
      {/* ASIDE CONTAINER */}
      <aside ref={asideContainer} className={style.container}>
        <p>Filters</p>

        <div className={style.btnClearContainer}>
          <button onClick={handleClearFilters} className={style.btnClear}>
            Clear Filters
          </button>
        </div>

        <div className={style.searchContainer}>
          <div className={style.labelSearch}>
            <label htmlFor="filter">By Name</label>
          </div>
          <div className={style.inputSearchContainer}>
            <form onSubmit={handleOnSubmit}>
              <input
                onChange={handleInputChange}
                value={searchedCountry.value}
                type="text"
                placeholder="Country name"
                id="filter"
              />
              <a onClick={handleOnSubmit} href="#">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </form>
          </div>
        </div>

        <FieldsSideBar id={"continent"} text={"Order by Continent"}>
          <select
            onChange={handleContinentSelect}
            ref={orderContinent}
            defaultValue={"All"}
            className={style.select}
            id="continent"
          >
            {Array.from([
              "All",
              "Africa",
              "Antarctica",
              "Asia",
              "Europe",
              "South America",
              "North America",
              "Oceania",
            ]).map((continent) => {
              return (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              );
            })}
          </select>
        </FieldsSideBar>

        <FieldsSideBar id={"orderAlphabetically"} text={"Order Alphabetically"}>
          <select
            onChange={handleAlphabeticallySelect}
            ref={orderAlphabetically}
            defaultValue={"None"}
            className={style.select}
            id="orderAlphabetically"
          >
            <option value="None">None</option>
            {Array.from(["A-Z", "Z-A"]).map((order) => {
              return (
                <option key={order} value={order}>
                  {order}
                </option>
              );
            })}
          </select>
        </FieldsSideBar>

        <FieldsSideBar id={"orderPopulation"} text={"Order by Population"}>
          <select
            ref={orderPopulation}
            onChange={handlePopulationSelect}
            defaultValue={"None"}
            className={style.select}
            id="orderPopulation"
          >
            <option value="None">None</option>
            {Array.from(["Ascendent", "Descendent"]).map((order) => {
              return (
                <option key={order} value={order}>
                  {order}
                </option>
              );
            })}
          </select>
        </FieldsSideBar>

        <FieldsSideBar id={"activities"} text={"Order by Activity"}>
          <select
            onChange={handleActivitySelect}
            ref={orderActivity}
            defaultValue={"All"}
            className={style.select}
            id="activities"
          >
            <option value="All">All</option>
            {activities.all.map((activity) => {
              return (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              );
            })}
          </select>
        </FieldsSideBar>
      </aside>
    </>
  );
};

export default SideBar;

// State Management:

// actualFilters: This state variable holds the currently selected filters, including name, order, continent, and activity.
// searchedCountry: This state variable is used to manage the input value when searching for a country by name.
// Ref Elements:

// asideContainer, orderAlphabetically, orderContinent, orderPopulation, and orderActivity are references to DOM elements. They are used to toggle the visibility of the sidebar and manage dropdown selections.
// Filter Functions:

// clearFilters(): Toggles the visibility of the sidebar to clear all filters.
// handleShowFilters(e): Toggles the visibility of the sidebar when the "Filters" button is clicked.
// handleClearFilters(): Clears all filters and resets the state variables and dropdown selections.
// handleOnSubmit(e): Handles the search by name functionality when the search icon is clicked.
// handleInputChange(e): Updates the searchedCountry state when the input field value changes.
// handleContinentSelect(e): Handles continent filter selection.
// handleAlphabeticallySelect(e): Handles alphabetical order filter selection.
// handlePopulationSelect(e): Handles population order filter selection.
// handleActivitySelect(e): Handles activity filter selection.
// Effect Hook:

// The useEffect hook listens for changes in the actualFilters state variable and dispatches the filterCountries action with the selected filters whenever they change.
// Render Method:

// The component renders a button labeled "Filters" to show/hide the sidebar.
// The sidebar is conditionally rendered based on the asideContainer ref and includes various filtering options such as name search, continent selection, alphabetical order, population order, and activity selection.
// The FieldsSideBar component is used to create the filter sections and group related UI elements together.
// Dropdowns and input fields trigger filter updates when interacted with.

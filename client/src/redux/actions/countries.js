// Import action types and axios library
import {
  CLEAN,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_ID,
  CLEAN_COUNTRY_ID,
  FILTER_COUNTRIES,
} from "./actionTypes";
import axios from "axios";

// Action to fetch all countries from the API
export function getCountries() {
  return async function (dispatch) {
    try {
      // Make a GET request to fetch countries data
      const response = await axios.get("http://localhost:3001/countries");
      // Dispatch the retrieved data to the store using the GET_ALL_COUNTRIES action type
      dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
    } catch (error) {
      // Log any errors that occur during the API request
      console.log(error);
    }
  };
}

// Action to filter countries by name
export function filterCountries(filters) {
  // Ensure that filters.name is defined, providing an empty string if it's not
  if (!filters.name) filters.name = "";
  return function (dispatch) {
    // Make a GET request to fetch countries based on the provided name filter
    return axios
      .get(`http://localhost:3001/countries/name?name=${filters.name}`)
      .then((response) => {
        // Dispatch the filtered data and filters to the store using the FILTER_COUNTRIES action type
        dispatch({
          type: FILTER_COUNTRIES,
          payload: { filterByName: response.data, ...filters },
        });
      })
      .catch((err) => console.log(err)); // Log any errors during the API request
  };
}

// Action to fetch a single country by its ID
export function getCountryById(id) {
  return function (dispatch) {
    // Make a GET request to fetch a country by its ID
    return axios
      .get(`http://localhost:3001/countries/${id}`)
      .then((response) => {
        // Dispatch the retrieved country data to the store using the GET_COUNTRY_BY_ID action type
        dispatch({ type: GET_COUNTRY_BY_ID, payload: response.data });
      })
      .catch((err) => {
        // Dispatch an error payload to the store if the request fails
        dispatch({
          type: GET_COUNTRY_BY_ID,
          payload: { error: err.response.data },
        });
      });
  };
}

// Action to clean the currently selected country's ID in the store
export function cleanCountryId() {
  return {
    type: CLEAN_COUNTRY_ID,
  };
}

// Action to perform a clean operation on the store
export function clean() {
  return {
    type: CLEAN,
  };
}

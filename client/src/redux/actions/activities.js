//action creators

import axios from "axios";
import {
  CREATE_NEW_ACTIVITY,
  CLEAN,
  GET_ALL_ACTIVITIES,
  LOADING_NEW_ACTIVITY,
} from "./actionTypes";

export function getActivities() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/activities/");
    dispatch({ type: GET_ALL_ACTIVITIES, payload: response.data });
  };
}

export function createActivity(activity) {
  return async function (dispatch) {
    try {
      dispatch({ type: LOADING_NEW_ACTIVITY, payload: true });
      const response = await axios.post(
        "http://localhost:3001/activities/",
        activity
      );
      dispatch({ type: LOADING_NEW_ACTIVITY, payload: false });
      dispatch({ type: CREATE_NEW_ACTIVITY, payload: response.data });
    } catch (error) {
      dispatch({ type: LOADING_NEW_ACTIVITY, payload: false });
      dispatch({
        type: CREATE_NEW_ACTIVITY,
        payload: { error: error.response.data },
      });
    }
  };
}

export function cleanActivity() {
  return {
    type: CLEAN,
  };
}







// export function createActivity(activity) {
//   return function (dispatch) {
//     dispatch({ type: LOADING_NEW_ACTIVITY, payload: true });

//     return axios
//       .post("http://localhost:3001/activities/", activity)
//       .then((response) => {
//         dispatch({ type: LOADING_NEW_ACTIVITY, payload: false });
//         dispatch({ type: CREATE_NEW_ACTIVITY, payload: response.data });
//         return response.data; // Resolve the promise with the response data
//       })
//       .catch((error) => {
//         dispatch({ type: LOADING_NEW_ACTIVITY, payload: false });
//         dispatch({
//           type: CREATE_NEW_ACTIVITY,
//           payload: { error: error.response.data },
//         });
//         throw error.response.data; // Reject the promise with the error data
//       });
//   };
// }
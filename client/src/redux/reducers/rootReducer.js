import { combineReducers } from "redux";
import countries from "./reducerCountries";
import activities from "./reducerActivities";

const combinedReducers = combineReducers({ countries, activities });
const rootReducer = combinedReducers;

export default rootReducer;

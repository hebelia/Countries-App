import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../redux/actions/activities";

export const useFetchActivities = () => {
  // gets access to the Redux dispatch function
  const dispatch = useDispatch();

  // access activities data from the Redux store
  const activities = useSelector((state) => state.activities.activities);

  //useEffect hook to perform side effects in a functional component
  useEffect(() => {
    // if they are not already loaded, dispatch an action to fetch activities
    if (!activities.loaded) dispatch(getActivities());
  }, [activities]); // this effect depends on the 'activities' data

  return { activities }; // returns activities data for use in the component
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../redux/actions/countries";

//initialize restart on false
export const useFetchCountries = (restart = false) => {
  // access the redux dispatch function
  const dispatch = useDispatch();

  // access the filtered countries data from the Redux store
  const filteredCountries = useSelector(
    (state) => state.countries.filteredCountries
  );

  // access the 'loaded' flag from the Redux store
  const loaded = useSelector((state) => state.countries.loaded);

  //useEffect hook to perform side effects in a functional component
  useEffect(() => {
    // dispatch an action to fetch countries if they are not already loaded or if 'restart' is true
    if (!loaded || restart) dispatch(getCountries());
  }, [loaded]); //depends on the 'loaded' flag

  return { filteredCountries, loaded }; // return the filtered countries data and 'loaded' flag for use in the component
};

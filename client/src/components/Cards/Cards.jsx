import { useEffect, useState } from "react";
import { useFetchCountries } from "../../hooks/useFetchCountries";

import Loading from "../Loading/Loading";
import Pagination from "./Pagination/Pagination";
import AllCountries from "./AllCountries/AllCountries";

import style from "./Cards.module.scss";

const Cards = () => {
  // initialize state for the range of countries to display
  const [limit, setLimit] = useState({ min: 0, max: 9 });

  // initialize state for the current page number
  const [pageNumber, setPageNumber] = useState(1);

  // use a custom hook to fetch and filter countries
  const { filteredCountries, loaded } = useFetchCountries();

  useEffect(() => {
    // resets the limit and page number when the filtered countries changes
    setLimit({ min: 0, max: 9 });
    setPageNumber(1);
  }, [filteredCountries]);

  return (
    <main className={style.container}>
      <div className={style.titleContainer}>
        <h3>&gt;_ Countries</h3>
      </div>
      {loaded && filteredCountries.length ? ( // checks if data is loaded and there are filtered countries
        <AllCountries filteredCountries={filteredCountries} limit={limit} />
      ) : (
        <div className={style.cardsContainer}>
          {/* render a loading component while data is being fetched */}
          <Loading />
        </div>
      )}
      {loaded ? ( // checks if data is loaded
        <Pagination
          countries={filteredCountries}
          setLimit={setLimit}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      ) : (
        // render nothing if data is not loaded
        <></>
      )}
    </main>
  );
};

export default Cards;

import React, { useEffect } from "react";
import style from "./Pagination.module.scss";

const Pagination = ({ countries, setLimit, pageNumber, setPageNumber }) => {
  //number of items to display per page
  const itemsPerPage = 10;
  //total number of pages required based on the number of countries and items per page
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  //handle when a page button is clicked
  const handleOnClickPage = (e) => {
    e.preventDefault(); // prevent the default behavior of link clicks
    const page = Number(e.target.innerText); // get the page number from the clicked button's text
    const min = (page - 1) * itemsPerPage; // calculate the minimum item index to display on the selected page
    const max = min + itemsPerPage - 1; // calculate the maximum item index to display on the selected page
    setLimit({ min, max }); // set the limit for displaying items
    setPageNumber(page); // set the current page number
  };

  const handlePreviousPage = () => {
    // check if the current page is not the first page
    if (pageNumber > 1) {
      const newPage = pageNumber - 1; //  new page number
      const min = (newPage - 1) * itemsPerPage; //minimum item index for the new page
      const max = min + itemsPerPage - 1; //maximum item index for the new page
      setLimit({ min, max }); // set the limit for displaying items on the new page
      setPageNumber(newPage); // set the current page number to the new page
    }
  };

  const handleNextPage = () => {
    // checks if the current page is not the last page
    if (pageNumber < totalPages) {
      const newPage = pageNumber + 1; //new page number
      const min = (newPage - 1) * itemsPerPage; // minimum item index for the new page
      const max = min + itemsPerPage - 1; // maximum item index for the new page
      setLimit({ min, max }); // sets the limit for displaying items on the new page
      setPageNumber(newPage); // set the current page number to the new page
    }
  };
  //array to store page numbers for rendering page buttons
  const buttonsPage = [];
  for (let i = 0; i < totalPages; i++) {
    buttonsPage.push(i + 1); // adds page numbers to the array
  }

  return (
    <div className={style.containerPages}>
      <div className={style.pages}>
        {/* render the prevous page button with click event and disabled state */}
        <button
          className={style.btnPage}
          onClick={handlePreviousPage}
          disabled={pageNumber === 1}
        >
          Previous Page
        </button>
        {/* map through the page numbers and render buttons with click events */}
        {buttonsPage.map((page) => (
          <button
            className={
              pageNumber === page
                ? `${style.active} ${style.btnPage}`
                : `${style.btnPage}`
            }
            onClick={handleOnClickPage}
            key={page}
          >
            {page}
          </button>
        ))}
        {/* render the "Next Page" button with click event and disabled state */}
        <button
          className={style.btnPage}
          onClick={handleNextPage}
          disabled={pageNumber === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;

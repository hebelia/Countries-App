
import React, { useEffect } from "react";
import style from "./Pagination.module.scss";

const Pagination = ({ countries, setLimit, pageNumber, setPageNumber }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  // // initialize the limit when the component mounts
  // useEffect(() => {
  //   // adjust this value as needed
  //   const min = 0;
  //   const max = min + itemsPerPage - 1;
  //   setLimit({ min, max });
  // }, [setLimit]);

  const handleOnClickPage = (e) => {
    e.preventDefault();
    const page = Number(e.target.innerText);
    const min = (page - 1) * itemsPerPage;
    const max = min + itemsPerPage - 1;
    setLimit({ min, max });
    setPageNumber(page);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      const newPage = pageNumber - 1;
      const min = (newPage - 1) * itemsPerPage;
      const max = min + itemsPerPage - 1;
      setLimit({ min, max });
      setPageNumber(newPage);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      const newPage = pageNumber + 1;
      const min = (newPage - 1) * itemsPerPage;
      const max = min + itemsPerPage - 1;
      setLimit({ min, max });
      setPageNumber(newPage);
    }
  };

  const buttonsPage = [];
  for (let i = 0; i < totalPages; i++) {
    buttonsPage.push(i + 1);
  }

  return (
    <div className={style.containerPages}>
      <div className={style.pages}>
        <button
          className={style.btnPage}
          onClick={handlePreviousPage}
          disabled={pageNumber === 1}
        >
          Previous Page
        </button>
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

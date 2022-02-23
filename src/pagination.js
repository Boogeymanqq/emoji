import React, { useState } from "react";
import "../src/style.css";

export function Pagination({ viewPage, viewPerPage, totalCards, setViewPage }) {
  // отрисовка кнопок
  const pageNumbers = [];

  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalCards / viewPerPage); i++) {
    pageNumbers.push(i);
  }

  function nextPage() {
    setViewPage(viewPage + 1);
    if (viewPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  function prevPage() {
    setViewPage(viewPage - 1);
    if ((viewPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <button
        className="pagination__btn"
        onClick={nextPage}
        disabled={viewPage === pageNumbers.length ? true : false}
      >
        &hellip;
      </button>
    );
  }

  let pageDecrementBtn = null;
  if (pageNumbers.length > minPageNumberLimit) {
    pageDecrementBtn = (
      <button
        className="pagination__btn"
        onClick={prevPage}
        disabled={viewPage === 1 ? true : false}
      >
        &hellip;
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        style={{ borderRadius: "4px 0px 0px 4px" }}
        className="pagination__btn"
        onClick={prevPage}
        disabled={viewPage === 1 ? true : false}
      >
        Prev
      </button>
      {pageDecrementBtn}
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          padding: "0",
          margin: "0",
        }}
      >
        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li key={number}>
                <button
                  className={
                    viewPage === number
                      ? "pagination__btn__active"
                      : "pagination__btn"
                  }
                  onClick={() => setViewPage(number)}
                >
                  {number}
                </button>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
      {pageIncrementBtn}
      <button
        className="pagination__btn"
        style={{ borderRadius: "0px 4px 4px 0px" }}
        onClick={nextPage}
        disabled={viewPage === pageNumbers.length ? true : false}
      >
        Next
      </button>
    </div>
  );
}

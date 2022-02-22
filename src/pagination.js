import React from "react";

export function Pagination({ viewPage, viewPerPage, totalCards, paginate }) {
  // отрисовка кнопок
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / viewPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "10px",
          listStyle: "none",
        }}
      >
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={viewPage === number ? "disabled" : "active"}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

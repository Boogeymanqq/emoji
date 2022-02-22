import { useState, useEffect } from "react";
import { Emoji } from "./Emoji";
import { Pagination } from "./pagination";
import { EmojiHeader } from "./header";
import "../src/style.css";

const url = "https://emoji-api-app.herokuapp.com/";
async function getData() {
  const response = await fetch(url);
  return await response.json();
}

export const Main = () => {
  const [data, setData] = useState([]);
  const [key, setkey] = useState([]);
  const [viewPage, setViewPage] = useState(1);
  const [viewPerPage, setViewPerPage] = useState(15);
  const [selectValue, setSelectValue] = useState();

  useEffect(async () => {
    const apiArr = await getData();
    setData(apiArr);
  }, []);

  ///
  const lastIndex = viewPage * viewPerPage;
  const firstIndex = lastIndex - viewPerPage;
  const indexPage = data.slice(firstIndex, lastIndex);
  ///

  function paginate(pageNumber) {
    return setViewPage(pageNumber);
  }

  function nextPage() {
    return setViewPage((prev) => prev + 1);
  }

  function prevPage() {
    return setViewPage((prev) => (prev === 1 ? prev : prev - 1));
  }

  function handleChange(event) {
    let userValue = event.target.value.toLowerCase().trim();
    setkey(userValue);
    // console.log(userValue);
  }

  let filtred = data.filter(
    (elem) =>
      elem.keywords.toLowerCase().includes(key) ||
      elem.title.toLowerCase().includes(key)
  );

  return (
    <div className="wrapper">
      <>
        <EmojiHeader onChange={handleChange} />
        <input
          className="input"
          type="text"
          value={data.keywords}
          onChange={handleChange}
        />
      </>
      <div className="main">
        <div className="main__container">
          {filtred.length === 0
            ? "Loading"
            : key.length === 0
            ? indexPage.map((elem, index) => (
                <Emoji
                  key={index}
                  symbol={elem.symbol}
                  title={elem.title}
                  keywords={elem.keywords
                    .split(" ")
                    .filter((elem, index, arr) => arr.indexOf(elem) === index)
                    .join(" ")}
                />
              ))
            : filtred.map((elem, index) => (
                <Emoji
                  key={index}
                  symbol={elem.symbol}
                  title={elem.title}
                  keywords={elem.keywords
                    .split(" ")
                    .filter((elem, index, arr) => arr.indexOf(elem) === index)
                    .join(" ")}
                />
              ))}
        </div>
      </div>
      <div className="footer">
        <button onClick={prevPage}>Prev Page</button>
        <Pagination
          viewPerPage={viewPerPage}
          totalCards={filtred.length}
          paginate={paginate}
          viewPage={viewPage}
        />
        <button onClick={nextPage}>Next Page</button>
        <select
          value={selectValue}
          onChange={(event) => setSelectValue(event.target.value)}
        >
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </div>
    </div>
  );
};

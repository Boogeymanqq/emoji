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
  const [keys, setKeys] = useState("");
  const [viewPage, setViewPage] = useState(1);
  const [viewPerPage, setViewPerPage] = useState(12);

  useEffect(async () => {
    const apiArr = await getData();
    setData(apiArr);
  }, []);

  ///
  const lastIndex = viewPage * viewPerPage;
  const firstIndex = lastIndex - viewPerPage;
  const indexPage = data.slice(firstIndex, lastIndex);
  ///

  function handleChange(event) {
    let userValue = event.target.value.toLowerCase().trim();
    setKeys(userValue);
  }

  let filtred = data.filter(
    (elem) =>
      elem.keywords.toLowerCase().includes(keys) ||
      elem.title.toLowerCase().includes(keys)
  );

  return (
    <div className="wrapper">
      <header className="header">
        <EmojiHeader />
        <div className="header__search">
          <input
            className="input"
            type="text"
            placeholder="Введите emoji"
            value={keys}
            onChange={handleChange}
          />
        </div>
      </header>
      <div className="main">
        <div className="main__container">
          {filtred.length === 0 ? (
            <img
              src={require("../src/Wedges-3s-200px.gif")}
              width="100%"
              height="100%"
              alt="loading..."
            />
          ) : keys.length === 0 ? (
            indexPage.map((elem, index) => (
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
          ) : (
            filtred.map((elem, index) => (
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
          )}
        </div>
      </div>
      <footer className="footer">
        <div className="footer__container">
          <Pagination
            viewPerPage={viewPerPage}
            totalCards={filtred.length}
            setViewPage={setViewPage}
            viewPage={viewPage}
          />
          <div className="pagination__select">
            <label htmlFor="select">Per page</label>
            <select
              className="pagination__select__page"
              id="select"
              value={viewPerPage}
              onChange={(event) => setViewPerPage(event.target.value)}
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
};

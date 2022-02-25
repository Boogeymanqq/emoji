import { useState, useEffect } from "react";
import { Emoji } from "./Emoji";
import { Paginator } from "./Paginator";
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

  useEffect(() => {
    setViewPage(1);
  }, [keys, viewPerPage]);

  function handleChange(event) {
    // const space = " ";
    let userValue = event.target.value.split(",");
    // console.log(userValue);
    setKeys(userValue);
  }

  const filtred = data.filter(
    (elem) =>
      elem.keywords.toLowerCase().includes(keys) ||
      elem.title.toLowerCase().includes(keys) ||
      elem.keywords.toLowerCase().includes(keys[0]) +
        elem.keywords.toLowerCase().includes(keys[1]) ||
      elem.title.toLowerCase().includes(keys[0]) +
        elem.title.toLowerCase().includes(keys[1])
  );

  ///
  const lastIndex = viewPage * viewPerPage;
  const firstIndex = lastIndex - viewPerPage;
  const indexPage = filtred.slice(firstIndex, lastIndex);
  ///

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
              style={{ alignSelf: "center", justifySelf: "center" }}
              src={require("../src/loading.gif")}
              width="200"
              height="200"
              alt="loading..."
            />
          ) : (
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
          )}
        </div>
      </div>
      <footer className="footer">
        <div className="footer__container">
          <Paginator
            page={viewPage}
            totalPage={Math.ceil(filtred.length / viewPerPage)}
            onPageChange={setViewPage}
          />
          <div className="pagination__select">
            <label>
              Per page
              <select
                className="pagination__select__page"
                value={viewPerPage}
                onChange={(event) => setViewPerPage(event.target.value)}
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
            </label>
          </div>
        </div>
      </footer>
    </div>
  );
};

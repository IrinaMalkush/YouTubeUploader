import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Url } from "./Url";
import { LoadSubTable } from "./LoadSubTable";
import { Pagination } from "./Pagination";
import { NumberOfItemsOnPage } from "./NumberOfItemsOnPage";
import { GetDate } from "./GetDate";
import "./stylesMainPage.css";
import { VisibilityFilters, filterHasSet } from "../store/ActionCreator";

export default function MainPage() {
  const [data, setData] = useState({ items: [], totalPages: [] });
  const [itemsOnPage, setItemsOnPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showingDetails, setShowingDetails] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(1);
  }, [itemsOnPage]);

  const fetchData = async (pageNumber) => {
    setIsError(false);
    setIsLoading(true);
    try {
      let response = await fetch(Url + `?page=${pageNumber}&pagesize=${itemsOnPage}`);
      const result = await response.json();
      const pageNumbers = [];
      if(result.total !== null) {
        for(let i = 1; i <= Math.ceil(result.total/itemsOnPage); i++){
          pageNumbers.push(i);
        }
      }

      setData({ items: result.items, totalPages: pageNumbers });

    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const changeSubtableClassName = (id) => {
    let subTab = document.getElementsByClassName("subTable" + id);
    let newShowingDetails = [...showingDetails];
    if (subTab[0].classList.contains("hiddenSubTable")) {
      subTab[0].classList.remove("hiddenSubTable");
      subTab[0].classList.add("visibleSubTable");
      if (!showingDetails.includes(id)) {
          newShowingDetails.push(id);
      }
    } else {
      subTab[0].classList.add("hiddenSubTable");
      subTab[0].classList.remove("visibleSubTable");
      if (showingDetails.includes(id)) {
        newShowingDetails = showingDetails.filter((item) => item !== id);
      }
    }
    setShowingDetails(newShowingDetails);
    changeClickedItemClassName(id);
  };

  const changeClickedItemClassName = (id) => {
    let clicked = document.getElementsByClassName("table-body" + id);
    if (clicked[0].classList.contains("notClickedRow")) {
      clicked[0].classList.remove("notClickedRow");
      clicked[0].classList.add("clickedRow");
    } else {
      clicked[0].classList.add("notClickedRow");
      clicked[0].classList.remove("clickedRow");
    }
  }

  const selectNumberOfItems = (num) => {
    setItemsOnPage(num);
  }

  const clickedPage = (num) => {
    setCurrentPageNumber(num);
    fetchData(num);
  }

  const visibility = useSelector((state) => state.filter);
  const filteredItems = setVisibilityFilter(data.items, visibility);

  function setVisibilityFilter(items, filter) {
    let results = [];
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        results = items;
        break;
      case VisibilityFilters.SHOW_COMPLETED:
        results = items.filter(item => item.succeed != null);
        break;
      case VisibilityFilters.SHOW_UNDONE:
        results = items.filter(item => item.succeed == null);
        break;
    }
    return results;
  }

  if (isError) return <div>Сервер недоступен</div>;
  else
    return (
      <div className="main-table-container">
        <div className="navigation">
          <div>
            <span>Показать </span>
            <select onChange={(e) => dispatch(filterHasSet(e.target.value))}>
              <option value={VisibilityFilters.SHOW_ALL}>все</option>
              <option value={VisibilityFilters.SHOW_COMPLETED}>завершенные</option>
              <option value={VisibilityFilters.SHOW_UNDONE}>незагруженные</option>
            </select>
          </div>
          <Pagination currentPageNumber={currentPageNumber} totalPageNumber={data.totalPages} clickedPage={clickedPage} />
          <NumberOfItemsOnPage selectNumberOfItems={selectNumberOfItems} />
        </div>
        <div className="table-container">
          <table className="main-table">
            <thead>
              <tr className="table-head">
                <th className="date-column">добавлен</th>
                <th className="name-column-head">имя файла</th>
                <th className="status-column">состояние</th>
                <th className="date-column">завершено</th>
                <th>последняя ошибка</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="table-body">
                  <td colSpan="5">Загрузка...</td>
                </tr>
              ) : (
                  filteredItems.map((item) => {
                  return (
                    <React.Fragment key={item.id}>
                      <tr className={"table-body" + item.id + " notClickedRow"}
                        onClick={() => {
                          changeSubtableClassName(item.id);
                        }}
                      >
                        <GetDate fetchedDate={item.created} />
                        <td className="name-column"><div><div>{item.name}</div></div></td>
                        <td className="status-column">{item.status}</td>
                        <GetDate fetchedDate={item.succeed} />
                        <td className="error-column"><div><div>{item.lastError}</div></div></td>
                      </tr>
                      <tr>
                        <td
                          colSpan="5"
                          className={"subTable" + item.id + " hiddenSubTable"}
                        >
                          { showingDetails.includes(item.id) === true
                            ?
                            <LoadSubTable id={item.id} />
                            : null}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="navigation">
          <Pagination currentPageNumber={currentPageNumber} totalPageNumber={data.totalPages} clickedPage={clickedPage} />
        </div>
        <div className="copyright"><p>&copy; Разработка сайта Ирина Малкуш, 2020</p></div>
      </div>
    );
}

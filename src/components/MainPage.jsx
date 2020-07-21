import React, { useState, useEffect } from "react";
import { Url } from "./Url";
import { LoadSubTable } from "./LoadSubTable";
import { Pagination } from "./Pagination";
import { NumberOfItemsOnPage } from "./NumberOfItemsOnPage";
import { GetDate } from "./GetDate";
import "./stylesMainPage.css";

export default function MainPage() {
  const [data, setData] = useState({ items: [], totalPages: [] });
  const [itemsOnPage, setItemsOnPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showingDetails, setShowingDetails] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

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
  };

  const selectNumberOfItems = (num) => {
    setItemsOnPage(num);
    console.log("items on page:  " + itemsOnPage);
  }

  const clickedPage = (num) => {
    setCurrentPageNumber(num);
    fetchData(num);
  }

  if (isError) return <div>Сервер недоступен</div>;
  else
    return (
      <div className="main-table-container">
        <div className="navigation">
          <Pagination currentPageNumber={currentPageNumber} totalPageNumber={data.totalPages} clickedPage={clickedPage} />
          <NumberOfItemsOnPage selectNumberOfItems={selectNumberOfItems} />
        </div>
        <table className="main-table">
          <thead>
            <tr className="table-head">
              <th>добавлен</th>
              <th>имя файла</th>
              <th>состояние</th>
              <th>завершено</th>
              <th>последняя ошибка</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="table-body">
                <td colSpan="5">Загрузка...</td>
              </tr>
            ) : (
              data.items.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <tr className="table-body"
                      onClick={() => {
                        changeSubtableClassName(item.id);
                      }}
                    >
                      <GetDate fetchedDate={item.created} />
                      <td className="fileName-column">{item.name}</td>
                      <td className="status-column">{item.status}</td>
                      <td>{item.succeed}</td>
                      <td className="error-column">{item.lastError}</td>
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
        <div className="navigation">
          <Pagination currentPageNumber={currentPageNumber} totalPageNumber={data.totalPages} clickedPage={clickedPage} />
        </div>
      </div>
    );
}

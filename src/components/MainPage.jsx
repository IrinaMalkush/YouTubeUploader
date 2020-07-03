import React, { useState, useEffect } from "react";
import { Url } from "./Url";
import { LoadSubTable } from "./LoadSubTable";
import "./stylesMainPage.css";

export default function MainPage() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showingDetails, setShowingDetails] = useState([]);

  useEffect(() => {
    const fetchData = async (pageNumber) => {
      setIsError(false);
      setIsLoading(true);
      try {
        let response = await fetch(Url + `?page=${pageNumber}`);
        const result = await response.json();

        setData({ items: result.items, total: result.total });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData(1);
  }, []);

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

  if (isError) return <div>Сервер недоступен</div>;
  else
    return (
      <div className="main-table">
        <div>
          <p>Статус загрузки файлов</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>добавлен</th>
              <th>имя файла</th>
              <th>состояние</th>
              <th>завершено</th>
              <th>последняя ошибка</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5">Загрузка...</td>
              </tr>
            ) : (
              data.items.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <tr
                      onClick={() => {
                        changeSubtableClassName(item.id);
                      }}
                    >
                      <td>{item.created}</td>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                      <td>{item.succeed}</td>
                      <td>{item.lastError}</td>
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
    );
}

import React, { useEffect } from "react";
import { Url } from "./Url";
import { useDispatch } from "react-redux";
import { CreateTable } from "./CreateTable";
import "./stylesMainPage.css";

export default function MainPage() {
  useEffect(() => {
    makeRequestToServer(1);
  }, []);

  const dispatch = useDispatch();

  async function makeRequestToServer(pageNumber) {
    let response = await fetch(Url + `?page=${pageNumber}`);
    const data = await response.json();

    const actionChangeItems = {
      type: "CHANGE_ITEMS",
      payload: data.items,
    };

    const actionChangeTotal = {
      type: "CHANGE_TOTAL",
      payload: data.total,
    };

    dispatch(actionChangeTotal);
    dispatch(actionChangeItems);
  }

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
        {CreateTable()}
      </table>
    </div>
  );
}

import React, { useEffect } from "react";
import { Url } from "./Url";
import { useSelector, useDispatch } from "react-redux";
import "./stylesMainPage.css";

export default function MainPage() {
  useEffect(() => {
    MakeRequestToServer(1);
  }, []);

  const dispatch = useDispatch();

  async function MakeRequestToServer(pageNumber) {
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

  const CreateTable = () => {
    const items = useSelector((state) => state.items);

    if (items == null)
      return (
        <tbody>
          <tr><td>Загрузка...</td></tr>
        </tbody>
      );
    else
      return (
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.created}</td>
                <td>{item.name}</td>
                <td>{item.status}</td>
                <td>{item.succeed}</td>
                <td>{item.lastError}</td>
              </tr>
            );
          })}
        </tbody>
      );
  };

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

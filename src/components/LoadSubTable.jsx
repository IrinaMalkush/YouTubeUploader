import React, { useEffect } from "react";
import { SubTableUrl } from "./Url";
import { useDispatch, useSelector } from "react-redux";
import "./stylesSubTable.css";

export function LoadSubTable({ id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(makeRequestToServer(id));
  }, []);

  function itemsHasFetched(items) {
    return {
      type: "CHANGE_SUBTABLE_ITEMS",
      items,
    };
  }

  function makeRequestToServer(id) {
    return async (dispatch) => {
      let responseSubTable = await fetch(SubTableUrl + id);
      const dataSubTable = await responseSubTable.json();
      dispatch(itemsHasFetched(dataSubTable));
    };
  }

  const subTableItems = useSelector((state) => state.items);
  const filteredItems = subTableItems.filter(item => item.fileId === id);

  return (
    <table>
      <thead>
        <tr>
          <th>состояние</th>
          <th>последняя попытка</th>
          <th>завершено</th>
          <th>последняя ошибка</th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((item) => {
          return (
            <tr key={item.status}>
              <td>{item.status}</td>
              <td>{item.lastTry}</td>
              <td>{item.succeed}</td>
              <td>{item.lastError}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

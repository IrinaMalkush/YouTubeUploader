import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./stylesSubTable.css";
import { itemsHasFetched, makeRequestToServer } from "../store/ActionCreator";

export function LoadSubTable({ id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(makeRequestToServer(id));
  }, []);

  const subTableItems = useSelector((state) => state.items);
  const filteredItems = subTableItems.filter(item => item.fileId === id);

  return (
    <table className="sub-table">
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

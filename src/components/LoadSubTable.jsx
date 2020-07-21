import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./stylesSubTable.css";
import { makeRequestToServer } from "../store/ActionCreator";
import { GetDate } from "./GetDate";

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
                <td className="status-column">{item.status}</td>
                <GetDate fetchedDate={item.lastTry} />
                <GetDate fetchedDate={item.succeed} />
                <td>{item.lastError}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

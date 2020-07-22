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
      <div className="sub-table-container">
    <table className="sub-table">
      <thead>
        <tr className="subtable-head">
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
                <GetDate fetchedDate={item.lastTry} />
                <GetDate fetchedDate={item.succeed} />
                <td><div><div>{item.lastError}</div></div></td>
            </tr>
          );
        })}
      </tbody>
    </table>
      </div>
  );
}

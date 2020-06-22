import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./stylesMainPage.css";

export const CreateTable = () => {

    const changeSubtableClassName = (id) => {
            let subTab = document.getElementsByClassName("subTable" + id)

            if (subTab[0].classList.contains("hiddenSubTable"))
            {
                subTab[0].classList.remove("hiddenSubTable");
                subTab[0].classList.add("visibleSubTable");
            }
            else
            {
                subTab[0].classList.add("hiddenSubTable");
                subTab[0].classList.remove("visibleSubTable");
            }
    }

    const items = useSelector((state) => state.items);

    if (items == null)
      return (
        <tbody>
          <tr>
            <td>Загрузка...</td>
          </tr>
        </tbody>
      );
    else
      return (
        <tbody>
          {items.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <tr onClick={() => {changeSubtableClassName(item.id)}}>
                  <td>{item.created}</td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.succeed}</td>
                  <td>{item.lastError}</td>
                </tr>
                <tr>
                  <td colSpan="5" className = {"subTable" + item.id + " hiddenSubTable"}>
                    <table></table>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      );
  };
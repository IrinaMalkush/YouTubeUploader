import React, { useEffect } from "react";
import { Url } from "./Url";
import { createStore } from "redux";
import { useSelector } from "react-redux";

export default function MainPage() {
  
  useEffect(() => {
    MakeRequestToServer(1);
  }, []);

  const initialState = {
    items: null,
    total: null,
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHANGE_ITEMS":
        return { ...state, items: action.payload };
      case "CHANGE_TOTAL":
        return { ...state, total: action.payload };
    }
    return state;
  };

  const store = createStore(reducer);

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

    store.dispatch(actionChangeTotal);
    store.dispatch(actionChangeItems);
  }

  const CreateTable = () => {
    const items = useSelector(state => state.items);

    if (items == null)
      return (
        <div>
            <div>Загрузка...</div>
        </div>
      )
    else
      return (
        <div>
            {items.map((item) => {
            return (
              <div>
                <div>{item.created}</div>
                <div>{item.name}</div>
                <div>{item.status}</div>
                <div>{item.succeed}</div>
                <div>{item.lastError}</div>
              </div>)})}
        </div>
      );
  };

  return (
    <div>
      <div>
        <p>Статус загрузки файлов</p>
      </div>
      <div>{CreateTable()}</div>
    </div>
  );
}

import React, { useEffect } from "react";
import { Url } from "./Url";
import { useSelector, useDispatch } from "react-redux";

export default function MainPage() {
  
  useEffect(() => {
    MakeRequestToServer(1)
  }, [])

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

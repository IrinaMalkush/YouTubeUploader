import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";

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

export const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

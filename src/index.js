import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeContext from "./context/ThemeContext";
import Router from "./jsx/Router";
import "./css/style.css";
import "./css/custom.css";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <ThemeContext>
        <RouterProvider router={Router}></RouterProvider>
      </ThemeContext>
    </Provider>
);


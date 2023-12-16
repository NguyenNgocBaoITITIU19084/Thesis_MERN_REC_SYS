import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();

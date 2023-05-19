import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routes from "../src/routes/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;

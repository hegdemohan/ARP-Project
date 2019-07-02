import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import "../node_modules/jquery/dist/jquery.min.js";
import HeaderComponent from "./components/headerComponent/Header.Component";
import Router from "./routes";


function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Router />
    </div>
  );
}

export default App;

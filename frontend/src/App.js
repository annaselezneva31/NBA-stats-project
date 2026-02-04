import React from "react";
import { BrowserRouter } from "react-router";

import "./style/App.css";
import AppRouter from "./components/AppRouter";
import NBANavbar from "./components/NBANavbar";

function App() {
  return (
    <BrowserRouter>
      <NBANavbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

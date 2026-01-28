import React from "react";
import { BrowserRouter } from "react-router";

import "./style/App.css";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    // <PlayerById />
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

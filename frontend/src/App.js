import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router";

import "./style/App.css";
import AppRouter from "./components/AppRouter";
import NBANavbar from "./components/NBANavbar";
import { Teams, Players } from "./context";
import { useFetching } from "./hooks/useFetching";
import NBAService from "./API/NBAService";

function App() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [fetchListOfPlayers, isLoading, error] = useFetching(async () => {
    const response = await NBAService.getListOfPlayers();
    setPlayers(response);
  });
  const [fetchListOfTeams, isTeamsLoading, errorTeams] = useFetching(
    async () => {
      const response = await NBAService.getListOfTeams();
      setTeams(response);
    },
  );

  useEffect(() => {
    fetchListOfTeams();
    fetchListOfPlayers();
  }, []);
  return (
    <BrowserRouter>
      <Teams.Provider value={teams}>
        <Players.Provider value={players}>
          <NBANavbar />
          <AppRouter />
        </Players.Provider>
      </Teams.Provider>
    </BrowserRouter>
  );
}

export default App;

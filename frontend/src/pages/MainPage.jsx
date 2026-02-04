import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";

import { useFetching } from "../hooks/useFetching";
import NBAService from "../API/NBAService";
import AutocompleteSearch from "../components/AutocompleteSearch";

const SearchPlayer = () => {
  const router = useNavigate();
  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [listOfTeams, setListOfTeams] = useState([]);
  const [fetchListOfPlayers, isLoading, error] = useFetching(async () => {
    const response = await NBAService.getListOfPlayers();
    setListOfPlayers(response);
  });

  const [fetchListOfTeams, isTeamsLoading, errorTeams] = useFetching(
    async () => {
      const response = await NBAService.getListOfTeams();
      setListOfTeams(response);
    },
  );

  useEffect(() => {
    fetchListOfPlayers();
    fetchListOfTeams();
  }, []);

  // console.log(listOfTeams);

  return (
    <div>
      <AutocompleteSearch
        suggestions={listOfPlayers}
        searchFunc={(id) => router(`/player/${id}`)}
        param="full_name"
      />
      <Button variant="outline-success" onClick={() => router(`/schedule`)}>
        Schedule
      </Button>
      <Button variant="outline-success" onClick={() => router(`/leaderboard`)}>
        Leader Board
      </Button>
      <Button variant="outline-success" onClick={() => router(`/login`)}>
        LogIn
      </Button>
      <Button variant="outline-success" onClick={() => router(`/about`)}>
        About
      </Button>
      <div>
        Teams:
        <ul>
          {listOfTeams &&
            listOfTeams.map((team) => {
              return (
                <li key={team.id}>
                  <a href={`/team/${team.id}`}>{team.full_name}</a>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SearchPlayer;

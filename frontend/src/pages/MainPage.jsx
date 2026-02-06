import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";

import AutocompleteSearch from "../components/AutocompleteSearch";
import { Teams, Players } from "../context";

const MainPage = () => {
  const router = useNavigate();
  const listOfTeams = useContext(Teams);
  const listOfPlayers = useContext(Players);

  return (
    <div>
      <strong>Every rights belong to NBA</strong>
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

export default MainPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useFetching } from "../hooks/useFetching";
import NBAService from "../API/NBAService";
import AutocompleteSearch from "../components/AutocompleteSearch";

const SearchPlayer = () => {
  const router = useNavigate();
  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [fetchListOfPlayers, isLoading, error] = useFetching(async () => {
    const response = await NBAService.getListOfPlayers();
    setListOfPlayers(response);
  });

  useEffect(() => {
    fetchListOfPlayers();
  }, []);

  const searchPlayer = (id) => {
    return router(`/player/${id}`);
  };

  return (
    <div>
      <AutocompleteSearch
        suggestions={listOfPlayers}
        searchFunc={searchPlayer}
        param="full_name"
      />
    </div>
  );
};

export default SearchPlayer;

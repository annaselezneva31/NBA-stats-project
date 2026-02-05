import React, { useEffect, useMemo, useState } from "react";

export const useFilterData = (rows) => {
  const [playerInput, setPlayerInput] = useState("");
  const [teamInput, setTeamInput] = useState("");

  const filteredRows = useMemo(() => {
    if (!playerInput && !teamInput) return rows;

    return rows.filter((row) => {
      // Bool if there is matched player
      const matchPlayer = row[2]
        .toLowerCase()
        .includes(playerInput.toLowerCase());
      // Bool if there is matched team
      const matchTeam = row[4].toLowerCase().includes(teamInput.toLowerCase());
      return matchPlayer && matchTeam;
    });
  }, [rows, playerInput, teamInput]);
  return { filteredRows, playerInput, teamInput, setPlayerInput, setTeamInput };
};

import React from "react";
import { useParams } from "react-router";

const TeamPage = () => {
  const params = useParams();
  return (
    <div>
      {params.id}
      <img
        src={`https://cdn.nba.com/logos/nba/${params.id}/global/L/logo.svg`}
        alt="team logo"
      />
    </div>
  );
};

export default TeamPage;

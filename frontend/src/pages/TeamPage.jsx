import React from "react";
import { useParams } from "react-router";

const TeamPage = () => {
  const params = useParams();
  return <div>{params.id}</div>;
};

export default TeamPage;

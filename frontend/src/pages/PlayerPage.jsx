import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useFetching } from "../hooks/useFetching";
import NBAService from "../API/NBAService";
import PlayerCard from "../components/PlayerCard";
import PlayerStats from "../components/PlayerStats";
import PlayerShotChart from "../components/PlayerShotChart";
import { transmitTypeOfSeason } from "../components/utils/transmitTypeOfSeason";

function PlayerById() {
  const params = useParams();

  const [commonInfo, setCommonInfo] = useState({});
  const [playerStats, setPlayerStats] = useState({});
  const [playerShotChart, setPlayerShotChart] = useState({});

  const [typeOfSeason, setTypeOfSeason] = useState("Regular Season");
  const [seasonYear, setSeasonYear] = useState("");
  const [teamsOfPlayer, setTeamsOfPlayer] = useState([]);
  const [teamForChart, setTeamForChart] = useState({});

  const [fetchByPlayerId, isLoading, error] = useFetching(async (id) => {
    const commonInfo = await NBAService.getPlayerById(id);
    setCommonInfo(commonInfo);
    setTeamsOfPlayer(commonInfo["player_teams_curr_year"]);
    setTeamForChart(commonInfo["player_teams_curr_year"][0]);
    const year = commonInfo["common_info"]["TO_YEAR"];
    setSeasonYear(year + "-" + String(year + 1).slice(-2));
  });

  const [fetchPlayerStats, isStatsLoading, errorStats] = useFetching(
    async (id) => {
      const seasonTotals = await NBAService.getPlayerStats(id);
      setPlayerStats(seasonTotals);
    },
  );

  const [fetchPlayerShotChart, isChartLoading, errorChart] = useFetching(
    async (id, year, team, seasonType) => {
      const shotChartData = await NBAService.getPlayerShotChartData(
        id,
        year,
        team,
        seasonType,
      );
      setPlayerShotChart(shotChartData);
    },
  );

  useEffect(() => {
    fetchByPlayerId(params.id);
    fetchPlayerStats(params.id);
  }, []);

  useEffect(() => {
    if (!teamForChart?.id || !typeOfSeason || !seasonYear) return;

    fetchPlayerShotChart(params.id, seasonYear, teamForChart.id, typeOfSeason);
  }, [typeOfSeason, seasonYear, teamForChart?.id]);

  const loadNewShotChartData = (year, teams, type) => {
    setSeasonYear(year);
    setTeamsOfPlayer(teams ?? []);
    setTypeOfSeason(transmitTypeOfSeason(type));
    setTeamForChart(teams[0]);
  };

  const chooseTeamFunc = (team) => {
    setTeamForChart(team);
  };

  // console.log("chosen season", seasonYear);
  // console.log("teams of player", teamsOfPlayer);
  // console.log("for chart", teamForChart);
  // console.log("chosen type", typeOfSeason);
  // console.log("PlayerPage", playerShotChart);

  // console.log(commonInfo);
  // console.log(playerStats);

  return (
    <div>
      {/* <Stack direction="horizontal" gap={3}>
        <PlayerCard info={info} />
        <PlayerStats stats={playerStats} />
      </Stack> */}

      <Container className="py-3">
        <Row className="g-4">
          {/* Player Card: left 25% on desktop, full width on mobile */}
          <Col xxs={12} md={12} lg={3}>
            <PlayerCard info={commonInfo} />
          </Col>

          {/* Player Stats: right 75% on desktop, full width on mobile */}
          <Col xxs={12} md={12} lg={9}>
            <PlayerStats
              stats={playerStats}
              loadNewShotChart={loadNewShotChartData}
            />
          </Col>
        </Row>
      </Container>
      <PlayerShotChart
        playerShotChart={playerShotChart}
        teams={teamsOfPlayer}
        isChartLoading={isChartLoading}
        chooseTeamFunc={chooseTeamFunc}
      />
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default PlayerById;

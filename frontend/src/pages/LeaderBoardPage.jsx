import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import { useFetching } from "../hooks/useFetching";
import NBAService from "../API/NBAService";
import { calcSeasons } from "../components/utils/calcSeasons";
import LeaderBoardTable from "../components/LeaderBoardTable";

const LeaderBoardPage = () => {
  const seasons = calcSeasons();
  const seasonTypes = ["Regular Season", "Playoffs", "All Star", "Pre Season"];
  const modes = ["Totals", "PerGame", "Per48"];
  const statCats = [
    "AST",
    "BLK",
    "PTS",
    "DREB",
    "FG3_PCT",
    "FG3A",
    "FG3M",
    "FG_PCT",
    "FGA",
    "FGM",
    "FTA",
    "FTM",
    "OREB",
    "PTS",
    "REB",
    "STL",
    "TOV",
  ];

  const [seasonUser, setSeasonUser] = useState(seasons.at(-1));
  const [seasonTypeUser, setSeasonTypeUser] = useState("Regular Season");
  const [statCatUser, setStatCatUser] = useState("PTS");
  const [modeUser, setModeUser] = useState("PerGame");

  const [leaderBoard, setLeaderBoard] = useState({});

  const [fetchLeaderBoard, isBoardLoading, errorBoard] = useFetching(
    async (seasonUser, seasonTypeUser, statCatUser, modeUser) => {
      const leaderBoard = await NBAService.getLeaderBoard(
        seasonUser,
        seasonTypeUser,
        statCatUser,
        modeUser,
      );
      setLeaderBoard(leaderBoard);
    },
  );

  useEffect(() => {
    fetchLeaderBoard(seasonUser, seasonTypeUser, statCatUser, modeUser);
  }, [seasonUser, seasonTypeUser, statCatUser, modeUser]);

  console.log(seasonUser, seasonTypeUser, statCatUser, modeUser);
  console.log(leaderBoard);

  const renderContent = () => {
    if (isBoardLoading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", margin: 50 }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }

    if (!leaderBoard?.rowSet?.length) {
      return (
        <div style={{ display: "flex", justifyContent: "center", margin: 50 }}>
          <strong>No data was found</strong>
        </div>
      );
    }

    return <LeaderBoardTable data={leaderBoard} />;
  };

  return (
    <div>
      <Container style={{ margin: "20px" }}>
        <Row style={{ margin: "20px" }}>
          <Col>
            <Form.Select
              value={seasonUser}
              onChange={(e) => {
                setSeasonUser(e.target.value);
              }}
            >
              {seasons.map((year, i) => {
                return (
                  <option key={i} value={year}>
                    {year}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              value={seasonTypeUser}
              onChange={(e) => {
                setSeasonTypeUser(e.target.value);
              }}
            >
              {seasonTypes.map((type, i) => {
                return (
                  <option key={i} value={type}>
                    {type}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              value={modeUser}
              onChange={(e) => {
                setModeUser(e.target.value);
              }}
            >
              {modes.map((mode, i) => {
                return (
                  <option key={i} value={mode}>
                    {mode}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              value={statCatUser}
              onChange={(e) => {
                setStatCatUser(e.target.value);
              }}
            >
              {statCats.map((stat, i) => {
                return (
                  <option key={i} value={stat}>
                    {stat}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
        </Row>
        <Row>{renderContent()}</Row>
      </Container>
    </div>
  );
};

export default LeaderBoardPage;

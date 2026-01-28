import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import HexbinShotChart from "./graphs/HexbinShotChart";
import ScatterPlot from "./graphs/TestD3";
import * as d3 from "d3";

const PlayerShotChart = ({
  playerShotChart,
  teams,
  isChartLoading,
  chooseTeamFunc,
}) => {
  const [teamIdForChart, setTeamIdForChart] = useState(teams[0]?.id);

  useEffect(() => {
    if (!teams) return;

    const selectedTeam = teams?.find(
      (team) => team.id === Number(teamIdForChart),
    );
    if (selectedTeam) {
      chooseTeamFunc(selectedTeam);
    }
  }, [teams, teamIdForChart]);

  // const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  // function onMouseMove(event) {
  //   const [x, y] = d3.pointer(event);
  //   setData(data.slice(-200).concat(Math.atan2(x, y)));
  // }

  // console.log(teams);
  // console.log(teamIdForChart);
  console.log(playerShotChart);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Shot Chart</Card.Title>
          <Card.Text>
            {teams.length > 1 && (
              <Form.Select
                value={teamIdForChart}
                onChange={(e) => setTeamIdForChart(e.target.value)}
              >
                {teams.map((team) => {
                  return (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <HexbinShotChart shotData={playerShotChart["shot_data"]} />
            <ScatterPlot data={playerShotChart["shot_data"]} />
          </ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default PlayerShotChart;

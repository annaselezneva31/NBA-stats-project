import React, { useState, useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ScatterPlot from "./graphs/ScatterPlot";
import WithFlagHexbinShotCart from "./graphs/WithFlagHexbinShotCart";
import DensityShotChart from "./graphs/DensityShotChart";

const PlayerShotChart = ({
  playerShotChart,
  teams,
  isChartLoading,
  chooseTeamFunc,
}) => {
  const [teamIdForChart, setTeamIdForChart] = useState(teams[0]?.id || null);
  const shotData = useMemo(
    () => playerShotChart?.shot_data || [],
    [playerShotChart],
  );

  useEffect(() => {
    if (!teams) return;

    const selectedTeam = teams.find(
      (team) => team.id === Number(teamIdForChart),
    );
    if (selectedTeam) {
      chooseTeamFunc(selectedTeam);
    }
  }, [teams, teamIdForChart]);

  const renderContent = () => {
    if (isChartLoading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", margin: 50 }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }

    if (!shotData.length) {
      return (
        <div style={{ display: "flex", justifyContent: "center", margin: 50 }}>
          <strong>No data was found</strong>
        </div>
      );
    }

    return (
      <Tabs
        defaultActiveKey="Frequency"
        id="shot-chart-tabs"
        className="mb-3"
        mountOnEnter
      >
        <Tab eventKey="Frequency" title="Frequency of shots">
          <DensityShotChart data={shotData} />
        </Tab>
        <Tab eventKey="missesBuckets" title="Misses & Buckets">
          <ScatterPlot data={shotData} />
        </Tab>
        <Tab eventKey="FrequencyFG" title="Frequency and FG%">
          <WithFlagHexbinShotCart data={shotData} />
        </Tab>
      </Tabs>
    );
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Shot Charts</Card.Title>
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
        {renderContent()}
      </Card>
    </div>
  );
};

export default PlayerShotChart;

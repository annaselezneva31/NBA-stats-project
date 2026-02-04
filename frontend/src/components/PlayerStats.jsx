import React, { useMemo, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";

import { addSpaceBeforeUpper } from "./utils/addSpaceBeforeUpper";

const PlayerStats = ({ stats, loadNewShotChart }) => {
  const [typeOfSeason, setTypeOfSeason] = useState("RegularSeason");
  const [seasonYear, setSeasonYear] = useState("");

  const availableTypesOfSeason = useMemo(() => {
    return (
      stats["season_totals"]?.map((type) =>
        type.name.replace("SeasonTotals", ""),
      ) ?? []
    );
  }, [stats]);

  const statsBySeasonType = useMemo(() => {
    return stats["season_totals"]?.find(
      (season) => season.name === `SeasonTotals${typeOfSeason}`,
    );
  }, [stats, typeOfSeason]);

  const availableSeasons = statsBySeasonType?.rowSet ?? [];

  const selectedSeasonYear = useMemo(() => {
    if (!availableSeasons?.length) return [];

    // Default = latest season for chosen type of season
    const latestSeason = availableSeasons.at(-1)[1];

    // If user-selected season is valid, use it
    return availableSeasons.some((season) => season[1] === seasonYear)
      ? seasonYear
      : latestSeason;
  }, [availableSeasons, seasonYear]);

  const selectedSeasonRows = availableSeasons?.filter(
    (row) => row[1] === selectedSeasonYear,
  );

  const selectedTeams = selectedSeasonRows
    ?.filter((row) => row[4] !== "TOT")
    .map((row) => {
      return { id: row[3], name: row[4] };
    });

  useEffect(() => {
    if (!selectedSeasonYear || !selectedTeams.length) return;

    loadNewShotChart(selectedSeasonYear, selectedTeams, typeOfSeason);
  }, [
    selectedSeasonYear,
    selectedTeams.map((t) => t.id).join(","),
    typeOfSeason,
  ]);

  //   console.log("types:", availableTypesOfSeason);
  //   console.log("Stats:", statsBySeasonType);
  // console.log("available seasons:", availableSeasons);
  // console.log("selected season:", selectedSeasonYear);
  //   console.log("selected row:", selectedSeasonRows);
  // console.log("selected team:", selectedTeam);
  // console.log("selected year:", seasonYear);

  return (
    <div>
      {stats["season_totals"] && (
        <Card>
          <Card.Body>
            <Card.Title>Season Statistics</Card.Title>

            <Stack direction="horizontal" gap={3}>
              <Form.Select
                value={typeOfSeason}
                onChange={(e) => {
                  setTypeOfSeason(e.target.value);
                }}
              >
                {availableTypesOfSeason.map((type) => {
                  return (
                    <option key={type} value={type}>
                      {addSpaceBeforeUpper(type)}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Select
                value={selectedSeasonYear}
                onChange={(e) => {
                  setSeasonYear(e.target.value);
                }}
              >
                {[...new Set(availableSeasons.map((season) => season[1]))].map(
                  (season, i) => {
                    return (
                      <option key={i} value={season}>
                        {season}
                      </option>
                    );
                  },
                )}
              </Form.Select>
            </Stack>
            <Card.Text></Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              {selectedSeasonRows && (
                <Table striped bordered hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th key={0}>Season</th>
                      <th key={1}>Team</th>
                      <th key={2}>Age</th>
                      {statsBySeasonType.headers.slice(6).map((stat, i) => (
                        <th key={i + 3}>{stat}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSeasonRows.map((row, i) => {
                      return (
                        <tr key={i}>
                          <td key={0}>{row[1]}</td>
                          <td key={1}>
                            <a
                              href={
                                row[3] !== 0 ? `/team/${row[3]}` : undefined
                              }
                            >
                              {row[4]}
                            </a>
                          </td>
                          <td key={2}>{row[5]}</td>
                          {row.slice(6).map((value, index) => (
                            <td key={index + 3}>{value}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </div>
  );
};

export default PlayerStats;

import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import { formatHeight } from "./utils/formatHeight";
import { formatWeight } from "./utils/formatWeight";
import { formatDate } from "./utils/formatDate";

const PlayerCard = ({ info }) => {
  if (!info["common_info"]) return "";

  console.log(info);
  const commonInfo = info["common_info"];
  const careerHigh = info["career_highs"]["rowSet"];
  const player_image =
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" +
      commonInfo["PERSON_ID"] +
      ".png" ||
    "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/National_Basketball_Association_logo.svg/250px-National_Basketball_Association_logo.svg.png";

  return (
    <div>
      {info["common_info"] && (
        <Card style={{ width: "100%" }}>
          <Row className="g-0 d-flex flex-row flex-xxl-column">
            <Col xxl={12} sm={4}>
              <Card.Img
                src={player_image}
                className="mx-auto d-block"
                style={{
                  maxWidth: "260px",
                  height: "auto",
                }}
              />
              <Card.Body>
                <Card.Title>{commonInfo["DISPLAY_FIRST_LAST"]}</Card.Title>
                <Card.Text>
                  Day of birth: {formatDate(commonInfo["BIRTHDATE"])}
                  <br />
                  Country: {commonInfo["COUNTRY"]}
                  <br />
                  School: {commonInfo["SCHOOL"]}
                  <br />
                  Roster Status: {commonInfo["ROSTERSTATUS"]}
                  <br />
                  Seasons played: {commonInfo["FROM_YEAR"]} -
                  {commonInfo["ROSTERSTATUS"] === "Active"
                    ? " curr. year"
                    : commonInfo["TO_YEAR"]}
                  <br />
                  Draft number: {commonInfo["DRAFT_NUMBER"]}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col xxl={12} sm={8}>
              <hr />
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  {commonInfo["ROSTERSTATUS"] === "Active"
                    ? "Current team: "
                    : "Last team: "}
                  <a href={`/team/${commonInfo["TEAM_ID"]}`}>
                    {commonInfo["TEAM_CITY"] + " " + commonInfo["TEAM_NAME"]}
                  </a>
                  <br />
                  Position: {commonInfo["POSITION"]}
                  <br />
                  Jersey: {commonInfo["JERSEY"]}
                </ListGroup.Item>
                <ListGroup.Item>
                  Height: {formatHeight(commonInfo["HEIGHT"])}
                  <br />
                  Weight: {formatWeight(commonInfo["WEIGHT"])}
                  <br />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Career Highs</strong>
                  <div className="career-highs-table">
                    <Table striped hover size="sm">
                      <thead>
                        <tr>
                          <th>Game Date</th>
                          <th>STAT</th>
                          <th>STAT Value</th>
                          <th>vs team</th>
                        </tr>
                      </thead>
                      <tbody>
                        {careerHigh?.map((row, i) => {
                          return (
                            <tr key={i}>
                              <td>{formatDate(row[2])}</td>
                              <td>{row[7]}</td>
                              <td style={{ textAlign: "center" }}>{row[8]}</td>
                              <td>
                                <a href={`/team/${row[3]}`}>{row[6]}</a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default PlayerCard;

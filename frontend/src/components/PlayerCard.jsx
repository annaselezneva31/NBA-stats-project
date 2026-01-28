import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const PlayerCard = ({ info }) => {
  if (!info["common_info"]) return "";

  const commonInfo = info["common_info"];
  const careerHigh = info["careerHigh"];
  const player_image =
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" +
      commonInfo["PERSON_ID"] +
      ".png" ||
    "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/National_Basketball_Association_logo.svg/250px-National_Basketball_Association_logo.svg.png";

  return (
    <div>
      {info["common_info"] && (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={player_image} />
          <Card.Body>
            <Card.Title>{commonInfo["DISPLAY_FIRST_LAST"]}</Card.Title>
            <Card.Text>{commonInfo["BIRTHDATE"]}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default PlayerCard;

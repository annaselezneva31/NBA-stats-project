import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import nbaLogo from "../img/nbaLogo.svg";
import { Teams, Players } from "../context";
import AutocompleteSearch from "./AutocompleteSearch";

const NBANavbar = () => {
  const router = useNavigate();
  const listOfTeams = useContext(Teams);
  const listOfPlayers = useContext(Players);

  const [showPlayers, setShowPlayers] = useState(false);
  return (
    <Navbar expand="md" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="/main" className="d-flex align-items-center">
          <img
            src={nbaLogo}
            width="20"
            height="40"
            className="d-inline-block align-top"
            alt=""
          />{" "}
          NBA Statistics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/main">Home</Nav.Link>
            <Nav.Link href="/schedule">Schedule</Nav.Link>
            <Nav.Link href="/leaderboard">Leaders</Nav.Link>
            <NavDropdown
              title="Players"
              // id="basic-nav-dropdown"
              show={showPlayers}
              rootclose={"true"}
              onToggle={(isOpen) => setShowPlayers(isOpen)}
              className="players-dropdown"
            >
              <AutocompleteSearch
                suggestions={listOfPlayers}
                searchFunc={(id) => {
                  setShowPlayers(false);
                  router(`/player/${id}`);
                }}
                param="full_name"
                onClose={() => setShowPlayers(false)} // close dropdown on click outside
              />
            </NavDropdown>
            <NavDropdown title="Teams" id="basic-nav-dropdown">
              {listOfTeams.map((team) => {
                return (
                  <NavDropdown.Item href={`/team/${team.id}`}>
                    {team.full_name}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NBANavbar;

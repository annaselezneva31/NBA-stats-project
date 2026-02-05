import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFilterData } from "../hooks/useFilterData";
import { getPageCount } from "./utils/pages";
import NBAPagination from "./UI/NBAPagination";

const LeaderBoardTable = ({ data }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const startPlayer = (page - 1) * limit;
  const endPlayer = page * limit;

  const { filteredRows, playerInput, teamInput, setPlayerInput, setTeamInput } =
    useFilterData(data.rowSet);

  useEffect(() => {
    setTotalPages(getPageCount(filteredRows.length, limit));
  }, [filteredRows, limit]);

  useEffect(() => {
    setPage(1);
  }, [playerInput, teamInput, limit]);

  return (
    <div>
      <Stack direction="horizontal" gap={2}>
        <div className="p-2">Filter by player: </div>
        <input
          type="text"
          value={playerInput}
          onChange={(e) => setPlayerInput(e.target.value)}
          placeholder="Type player name"
          className="p-2"
        />
        <div>Filter by team: </div>
        <input
          type="text"
          value={teamInput}
          onChange={(e) => setTeamInput(e.target.value)}
          placeholder="Type team abbreviation"
          className="p-2"
        />
        <Button
          variant="primary"
          onClick={() => {
            setPlayerInput("");
            setTeamInput("");
          }}
          className="p-2 "
        >
          Reset
        </Button>
        <div className="p-2 ms-auto">Limit</div>
        <Form.Select
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
          }}
          style={{ width: "80px" }}
          className="p-2"
        >
          {[20, 40, 60, 80, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </Form.Select>
      </Stack>
      <Table bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th key={0}>#</th>
            <th key={1}>PLAYER</th>
            <th key={2}>TEAM</th>
            {data.headers.slice(5).map((header, i) => (
              <th key={i + 3}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.slice(startPlayer, endPlayer).map((row, i) => {
            return (
              <tr key={i}>
                <td key={0}>{row[1]}</td>
                <td key={1}>
                  <a href={`/player/${row[0]}`}>{row[2]}</a>
                </td>
                <td key={2}>
                  {" "}
                  <a href={`/team/${row[3]}`}>{row[4]}</a>
                </td>
                {row.slice(5).map((value, index) => (
                  <td key={index + 3}>{value}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {!filteredRows.length && <strong>No available data</strong>}
      {totalPages > 1 && (
        <NBAPagination
          totalPages={totalPages}
          page={page}
          changePage={(page) => {
            setPage(page);
          }}
        />
      )}
    </div>
  );
};

export default LeaderBoardTable;

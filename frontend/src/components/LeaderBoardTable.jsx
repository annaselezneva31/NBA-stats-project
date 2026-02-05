import React from "react";
import Table from "react-bootstrap/Table";

const LeaderBoardTable = ({ data }) => {
  return (
    <div>
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
          {data.rowSet.map((row, i) => {
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
    </div>
  );
};

export default LeaderBoardTable;

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { drawCourt } from "./drawCourt";

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();
    const courtWidthFt = 50;
    const courtHeightFt = 47;

    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = (width * courtHeightFt) / courtWidthFt;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Scales
    const x = d3.scaleLinear().domain([0, 50]).range([0, width]);

    const y = d3.scaleLinear().domain([0, 47]).range([height, 0]);

    // Color and shape
    const colorScale = d3
      .scaleOrdinal()
      .domain([0, 1])
      .range(["#e20d0dff", "#167f0aff"]);

    const shapeScale = d3
      .scaleOrdinal()
      .domain([0, 1])
      .range([d3.symbolCircle, d3.symbolDiamond]);

    const symbol = d3.symbol().size(60);

    // Court
    drawCourt(svg, x, y);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // Points
    svg
      .append("g")
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("d", (d) => symbol.type(shapeScale(d["SHOT_MADE_FLAG"]))())
      .attr("transform", (d) => `translate(${x(d["LOC_X"])}, ${y(d["LOC_Y"])})`)
      .attr("fill", (d) => colorScale(d["SHOT_MADE_FLAG"]))
      .attr("opacity", 0.8);
  }, [data]); // re-run when data changes

  return <svg ref={svgRef} />;
};

export default ScatterPlot;

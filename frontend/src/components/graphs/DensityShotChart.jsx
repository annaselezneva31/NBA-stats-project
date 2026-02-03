import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { drawCourt } from "./graph_utils/drawCourt";

const DensityShotChart = ({ data }) => {
  const svgRef = useRef();
  // console.log(data);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clears anything previously drawn inside the SVG - prevents duplicate drawings
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 1, right: 1, bottom: 1, left: 1 };
    const width = 500;
    const height = 470;

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "6px 10px")
      .style("border", "1px solid #999")
      .style("border-radius", "4px")
      .style("pointer-events", "none") // so mouse doesn’t block
      .style("opacity", 0); // hidden initially

    const svg = d3
      .select(svgRef.current) // selects <svg> element using ref
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g") // adds a <g> group inside <svg> where everything will be drawn
      .attr("transform", `translate(${margin.left}, ${margin.top})`); // moves the group right and down so the chart will be with margins

    // court width in feet
    const x = d3.scaleLinear().domain([-25, 25]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 47]).range([height, 0]);

    // Convert to feet
    const dataFeet = data.map((d) => [x(d.LOC_X / 10), y(d.LOC_Y / 10 + 5)]);

    // Convert feet to pixels
    const ftToPx = x(1) - x(0);
    // Draw a court
    drawCourt(svg, x, y, ftToPx);

    // Create density estimator
    const density = d3
      .contourDensity()
      .x((d) => d[0])
      .y((d) => d[1])
      .size([width, height])
      .bandwidth(15); // controls smoothness (bigger = smoother)

    const contours = density(dataFeet);
    // console.log(contours);

    // Color scale: frequency of shots
    const colorScale = d3
      .scaleSequential(d3.interpolateReds)
      .domain([0, d3.max(contours, (d) => d.value)]);

    // Draw density areas
    svg
      .append("g")
      .selectAll("path")
      .data(contours)
      .join("path")
      .attr("d", d3.geoPath())
      .attr("fill", (d) => colorScale(d.value))
      .attr("opacity", 0.7)
      .on("mouseover", (event, d) => {
        tooltip.style("opacity", 1).html(`
            <strong>Shot frequency:</strong> ${(d.value * 100).toFixed(1)}%`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    const legendWidth = 20;
    const legendHeight = 100;

    const gradientId = `legend-gradient-frequency}`;

    const maxVal = d3.max(contours, (d) => d.value);
    const minVal = d3.min(contours, (d) => d.value) || 0.001; // avoid 0
    const legendScale = d3
      .scaleLog()
      .domain([minVal, maxVal])
      .range([legendHeight, 0]);

    // Color gradient
    const legendAxis = d3
      .axisRight(legendScale)
      .tickValues([minVal, maxVal])
      .tickFormat(d3.format(".1%"));

    // append a defs (for definition) element to SVG
    const defs = svg.append("defs");

    const logStops = d3
      .range(0, 1.01, 0.01)
      .map((t) => minVal * Math.pow(maxVal / minVal, t));

    const linearGradient = defs
      .append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%");

    linearGradient
      .selectAll("stop")
      .data(logStops)
      .join("stop")
      .attr("offset", (d, i) => `${(i / (logStops.length - 1)) * 100}%`)
      .attr("stop-color", (d) => colorScale(d));

    // Legend rect
    svg
      .append("rect")
      .attr("x", width - 480)
      .attr("y", 40)
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", `url(#${gradientId})`);

    // Legend axis
    svg
      .append("g")
      .attr("transform", `translate(${width - 480 + legendWidth}, 40)`)
      .call(legendAxis)
      .attr("font-size", "12px");

    // Legend title
    svg
      .append("text")
      .text("Shot frequency") // title
      .attr("x", width - 490) // aligned with rectangle
      .attr("y", 30) // above the rectangle
      .attr("font-size", "18px")
      .attr("font-weight", "bold");
  }, [data]);
  return (
    <div style={{ margin: 10 }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default DensityShotChart;

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { hexbin } from "d3-hexbin";

import { drawCourt } from "./graph_utils/drawCourt";

const WithFlagHexbinShotCart = ({ data }) => {
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

    // Convert to feet
    const dataFeet = data.map((d) => ({
      ...d,
      LOC_X: d.LOC_X / 10,
      LOC_Y: d.LOC_Y / 10 + 5,
    }));

    // court width in feet
    const x = d3.scaleLinear().domain([-25, 25]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 47]).range([height, 0]);

    const ftToPx = x(1) - x(0); // convert feet to pixels
    // Draw a court
    drawCourt(svg, x, y, ftToPx);

    // Hexbin setup - groups my point into hexagonal bins based on scales and radius
    const hex = hexbin()
      .x((d) => x(d.LOC_X))
      .y((d) => y(d.LOC_Y))
      .radius(20); // radius of bin in pixels

    const bins = hex(dataFeet);

    // Colorscale - percentage of made shots
    const colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, 1]);

    // Size scale - total attempts per bin
    const sizeScale = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([5, 30]);

    // Draw hexagons
    svg
      .append("g")
      .selectAll("path") // setup step for data binding
      .data(bins) // binds my data
      .join("path") // creates one <path> element per data point
      .attr("d", (d) => {
        // return hex.hexagon();
        // radius - total attempts
        const r = sizeScale(d.length);
        return hex.hexagon(r);
      })
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
      .attr("fill", (d) => {
        const madePct =
          d.filter((p) => p.SHOT_MADE_FLAG === 1).length / d.length;
        return colorScale(madePct); // color - percentage made
      })
      .attr("stroke", "#999")
      .attr("stroke-width", 1)
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        const madePct =
          d.filter((p) => p.SHOT_MADE_FLAG === 1).length / d.length;
        tooltip.style("opacity", 1)
          .html(`<strong>Attempts:</strong> ${d.length}<br/>
            <strong>Made shots:</strong> ${(madePct * 100).toFixed(0)}%<br/>`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Color legend
    const legendWidth = 20;
    const legendHeight = 100;
    const gradientId = `legend-gradient-FG}`;

    const legendScale = d3
      .scaleLinear()
      .domain(colorScale.domain())
      .range([legendHeight, 0]);

    // Color gradient
    const legendAxis = d3
      .axisRight(legendScale)
      .ticks(5)
      .tickFormat(d3.format(".1%"));

    // append a defs (for definition) element to SVG
    const defs = svg.append("defs");

    // const logStops = d3
    //   .range(0, 1.01, 0.01)
    //   .map((t) => minVal * Math.pow(maxVal / minVal, t));

    const linearGradient = defs
      .append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%");

    linearGradient
      .selectAll("stop")
      .data(d3.range(0, 1.01, 0.01))
      .join("stop")
      .attr("offset", (d) => `${d * 100}%`)
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
      .text("FG%") // title
      .attr("x", width - 490) // aligned with rectangle
      .attr("y", 25) // above the rectangle
      .attr("font-size", "18px")
      .attr("font-weight", "bold");

    // Size legend
    const sizeLegend = svg
      .append("g")
      .attr("transform", `translate(${width - 110}, 25)`); // position of the legend

    sizeLegend
      .append("text")
      .text("Total attempts")
      .attr("x", -30)
      .attr("y", 0)
      .attr("font-size", "18px")
      .attr("font-weight", "bold");

    const attemptValues = [
      Math.floor(d3.max(bins, (d) => d.length) / 4),
      Math.floor(d3.max(bins, (d) => d.length) / 2),
      Math.floor(d3.max(bins, (d) => d.length)),
    ];

    attemptValues.forEach((val, i) => {
      sizeLegend
        .append("path")
        .attr(
          "d",
          hexbin()
            .radius(sizeScale(val / 2))
            .hexagon(),
        )
        .attr("transform", `translate(20, ${i * 35 + 20})`)
        .attr("fill", "#999")
        .attr("stroke", "#333");

      sizeLegend
        .append("text")
        .attr("x", 40)
        .attr("y", i * 35 + 25)
        .text("~" + Math.round(val) + " att.")
        .attr("alignment-baseline", "middle");
    });
  }, [data]);
  return (
    <div style={{ margin: 10 }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default WithFlagHexbinShotCart;

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { drawCourt } from "./graph_utils/drawCourt";
import { calcDistance } from "./graph_utils/calcDistance";

const ScatterPlot = ({ data }) => {
  // Reference that later will point to <svg> element
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clears anything previously drawn inside the SVG - prevents duplicate drawings
    d3.select(svgRef.current).selectAll("*").remove();

    // Convert to feet
    const dataFeet = data.map((d) => ({
      ...d,
      LOC_X: d.LOC_X / 10,
      LOC_Y: d.LOC_Y / 10 + 5,
    }));

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

    const ftToPx = x(1) - x(0); // convert feet to pixels

    // Color and shape
    const colorScale = d3
      .scaleOrdinal()
      .domain([0, 1])
      .range(["#981313ff", "#5aca4eff"]);

    const shapeScale = d3
      .scaleOrdinal()
      .domain([0, 1])
      .range([d3.symbolCircle, d3.symbolDiamond]);

    const symbol = d3.symbol().size(60);

    // Draw a court
    drawCourt(svg, x, y, ftToPx);

    // Points
    svg
      .append("g")
      .selectAll("path") // setup step for data binding
      .data(dataFeet) // binds my data
      .join("path") // creates one <path> element per data point
      .attr("transform", (d) => `translate(${x(d["LOC_X"])}, ${y(d["LOC_Y"])})`)
      .attr("d", (d) => symbol.type(shapeScale(d["SHOT_MADE_FLAG"]))())
      .attr("fill", (d) => colorScale(d["SHOT_MADE_FLAG"]))
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        tooltip.style("opacity", 1)
          .html(`<strong>Shot Made:</strong> ${d["SHOT_MADE_FLAG"] === 1 ? "Yes" : "No"}<br/>
      <strong>Distance:</strong> ${calcDistance(d["LOC_X"], d["LOC_Y"] - 5)} ft`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 480}, 50)`); // position of the legend

    legend
      .append("text")
      .text("Misses & Buckets")
      .attr("x", width - 510)
      .attr("y", -20)
      .attr("font-size", "18px")
      .attr("font-weight", "bold");

    const categories = [0, 1]; // my shot flags

    categories.forEach((c, i) => {
      // Add symbol
      legend
        .append("path")
        .attr("d", d3.symbol().type(shapeScale(c)).size(100)())
        .attr("transform", `translate(0, ${i * 25})`)
        .attr("fill", colorScale(c));

      // Add label
      legend
        .append("text")
        .text(c === 0 ? "Shot missed" : "Shot made")
        .attr("x", 15)
        .attr("y", i * 25 + 3)
        .attr("alignment-baseline", "middle")
        .attr("font-size", "16px");
    });
  }, [data]); // re-run when data changes

  return (
    <div style={{ margin: 10 }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default ScatterPlot;

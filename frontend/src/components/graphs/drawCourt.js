import * as d3 from "d3";

export const drawCourt = (svg, xScale, yScale) => {
  const courtColor = "#aaa";
  const lineWidth = 2;

  // Outer boundaries
  svg
    .append("rect")
    .attr("x", xScale(0))
    .attr("y", yScale(47))
    .attr("width", xScale(50) - xScale(0))
    .attr("height", yScale(0) - yScale(47))
    .attr("fill", "none")
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Center line (half court)
  svg
    .append("line")
    .attr("x1", xScale(0))
    .attr("x2", xScale(50))
    .attr("y1", yScale(47))
    .attr("y2", yScale(47))
    .attr("stroke", courtColor);

  // Hoop
  svg
    .append("circle")
    .attr("cx", xScale(25))
    .attr("cy", yScale(5.25))
    .attr("r", xScale(1.25) - xScale(0))
    .attr("fill", "none")
    .attr("stroke", courtColor);

  // Backboard
  svg
    .append("line")
    .attr("x1", xScale(22))
    .attr("x2", xScale(28))
    .attr("y1", yScale(4))
    .attr("y2", yScale(4))
    .attr("stroke", courtColor);

  // Paint (key)
  svg
    .append("rect")
    .attr("x", xScale(17))
    .attr("y", yScale(19))
    .attr("width", xScale(33) - xScale(17))
    .attr("height", yScale(0) - yScale(19))
    .attr("fill", "none")
    .attr("stroke", courtColor);

  // Free throw circle (top)
  svg
    .append("path")
    .attr(
      "d",
      d3.arc()({
        innerRadius: xScale(6) - xScale(0),
        outerRadius: xScale(6) - xScale(0),
        startAngle: Math.PI,
        endAngle: 0,
      }),
    )
    .attr("transform", `translate(${xScale(25)}, ${yScale(19)})`)
    .attr("fill", "none")
    .attr("stroke", courtColor);

  // Three point arc
  svg
    .append("path")
    .attr(
      "d",
      d3.arc()({
        innerRadius: xScale(23.75) - xScale(0),
        outerRadius: xScale(23.75) - xScale(0),
        startAngle: Math.PI * 0.22,
        endAngle: Math.PI * 0.78,
      }),
    )
    .attr("transform", `translate(${xScale(25)}, ${yScale(5.25)})`)
    .attr("fill", "none")
    .attr("stroke", courtColor);
};

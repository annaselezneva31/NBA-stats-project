import * as d3 from "d3";

export const drawCourt = (svg, xScale, yScale, ftToPx) => {
  const courtColor = "#4d4b4bff";
  const lineWidth = 2;
  const paintColor = "#efa147ff";

  // Outer boundaries
  svg
    .append("rect") // creates a rectangle element
    .attr("x", xScale(-25)) // sets the left edge to 0 feet
    .attr("y", yScale(47)) // sets the top of rect to 47 feet
    .attr("width", xScale(50) - xScale(0)) // sets width - 50 feet
    .attr("height", yScale(0) - yScale(47)) // sets height - 47 feet
    .attr("fill", "none") // sets inside of rect transparent i.e. creates just outline
    .attr("stroke", courtColor)
    .attr("stroke-width", 3);

  // Center circle (big)
  svg
    .append("path") // creates a path not a circle
    .attr(
      "d",
      d3.arc()({
        // creates an arc generator
        innerRadius: 6 * ftToPx,
        outerRadius: 6 * ftToPx, // makes it a single line
        startAngle: (3 * Math.PI) / 2, // left side of the circle
        endAngle: Math.PI / 2, // right side of the circle
      }),
    )
    .attr("transform", `translate(${xScale(0)}, ${yScale(47)})`) // moves center of this arc at x=25 feet, y=19 feet
    .attr("fill", "none")
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Center circle (small)
  svg
    .append("path") // creates a path not a circle
    .attr(
      "d",
      d3.arc()({
        // creates an arc generator
        innerRadius: 2 * ftToPx,
        outerRadius: 2 * ftToPx, // makes it a single line
        startAngle: (3 * Math.PI) / 2, // left side of the circle
        endAngle: Math.PI / 2, // right side of the circle
      }),
    )
    .attr("transform", `translate(${xScale(0)}, ${yScale(47)})`) // moves center of this arc at x=25 feet, y=19 feet
    .attr("fill", "none")
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Hoop
  svg
    .append("circle")
    .attr("cx", xScale(0)) // sets x-center of the court
    .attr("cy", yScale(5.25)) // sets y-center of the court
    .attr("r", 1.25 * ftToPx) // sets the radius 1.25 feet converted to pixels
    .attr("fill", "none")
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Backboard
  svg
    .append("line")
    .attr("x1", xScale(-3)) // 6 foot wide centered at midcourt
    .attr("x2", xScale(3))
    .attr("y1", yScale(4)) // 4 feet from the baseline
    .attr("y2", yScale(4))
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Restricted zone arc
  svg
    .append("path") // creates a path not a circle
    .attr(
      "d",
      d3.arc()({
        innerRadius: 4 * ftToPx,
        outerRadius: 4 * ftToPx,
        startAngle: Math.PI / 2,
        endAngle: -Math.PI / 2,
      }),
    )
    .attr("transform", `translate(${xScale(0)}, ${yScale(5.25)})`)
    .attr("fill", "none")
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Paint
  svg
    .append("rect")
    .attr("x", xScale(-8)) // left corner
    .attr("y", yScale(19)) // top corner
    .attr("width", xScale(8) - xScale(-8)) // 16 feet wide
    .attr("height", yScale(0) - yScale(19)) // 19 feet height
    .attr("fill", paintColor)
    .attr("fill-opacity", 0.1)
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Free throw circle (top)
  svg
    .append("path") // creates a path not a circle
    .attr(
      "d",
      d3.arc()({
        // creates an arc generator
        innerRadius: 6 * ftToPx,
        outerRadius: 6 * ftToPx, // makes it a single line
        startAngle: Math.PI / 2, // left side of the circle
        endAngle: -Math.PI / 2, // right side of the circle
      }),
    )
    .attr("transform", `translate(${xScale(0)}, ${yScale(19)})`) // moves center of this arc at x=25 feet, y=19 feet
    .attr("fill", "none")
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Free throw circle (bottom)
  svg
    .append("path") // creates a path not a circle
    .attr(
      "d",
      d3.arc()({
        // creates an arc generator
        innerRadius: 6 * ftToPx,
        outerRadius: 6 * ftToPx, // makes it a single line
        startAngle: Math.PI + Math.PI / 2, // left side of the circle
        endAngle: 0 + Math.PI / 2, // right side of the circle
      }),
    )
    .attr("transform", `translate(${xScale(0)}, ${yScale(19)})`) // moves center of this arc at x=25 feet, y=19 feet
    .attr("fill", "none")
    .attr("stroke-dasharray", "5,10")
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Free throw  side line (left)
  svg
    .append("line") // straight line
    .attr("x1", xScale(-6)) // line spans to the full width of the court
    .attr("x2", xScale(-6))
    .attr("y1", yScale(0)) // line is placed at 47 feet
    .attr("y2", yScale(19))
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Free throw  side line (right)
  svg
    .append("line") // straight line
    .attr("x1", xScale(6)) // line spans to the full width of the court
    .attr("x2", xScale(6))
    .attr("y1", yScale(0)) // line is placed at 47 feet
    .attr("y2", yScale(19))
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Three point arc
  svg
    .append("path") // creates a path not a circle
    .attr(
      "d",
      d3.arc()({
        innerRadius: 23.75 * ftToPx,
        outerRadius: 23.75 * ftToPx,
        startAngle: Math.PI * 0.12 - Math.PI / 2,
        endAngle: Math.PI * 0.88 - Math.PI / 2,
      }),
    )
    .attr("transform", `translate(${xScale(0)}, ${yScale(5.25)})`)
    .attr("fill", "none")
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Three point side line (left)
  svg
    .append("line") // straight line
    .attr("x1", xScale(-22)) // line spans to the full width of the court
    .attr("x2", xScale(-22))
    .attr("y1", yScale(0)) // line is placed at 47 feet
    .attr("y2", yScale(14))
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);

  // Three point side line (right)
  svg
    .append("line") // straight line
    .attr("x1", xScale(22)) // line spans to the full width of the court
    .attr("x2", xScale(22))
    .attr("y1", yScale(0)) // line is placed at 47 feet
    .attr("y2", yScale(14))
    .attr("stroke", courtColor)
    .attr("stroke-width", lineWidth);
};

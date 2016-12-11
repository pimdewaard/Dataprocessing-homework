// Create the dimensions of the canvas
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Parse the Date and format time for date in pop up menu
var parseDate = d3.time.format("%m%d").parse;
var formatTime = d3.time.format("%e %B");

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Creates the ranges for x and y axis
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the lines for each of the different temperature data
var AVline = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Av); });

var MINline = d3.svg.line()
		.x(function(d) { return x(d.Date); })
		.y(function(d) { return y(d.Min); });

var MAXline = d3.svg.line()
		.x(function(d) { return x(d.Date); })
		.y(function(d) { return y(d.Max); });

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// Selects the different json files according to the clickvalue
d3.selectAll(".m")
    .on("click", function() {
    var year = this.getAttribute("value");

    var str;
    if(year == "1915"){
          str = "temp1915.json";
          d3.selectAll("path.line").remove();
          d3.selectAll("circle").remove();
          d3.selectAll("g.y-axis").remove();
          d3.selectAll("g.x-axis").remove();
        }else if(year == "2015"){
          str = "temp2015.json";
          d3.selectAll("path.line").remove();
          d3.selectAll("circle").remove();
          d3.selectAll("g.y-axis").remove();
          d3.selectAll("g.x-axis").remove();
          }

// Get the data
d3.json(str, function(error, data) {
    data.forEach(function(d) {
        d.Date = parseDate(d.Date);
        d.Av = +(d.Average/10);
				d.Min = +(d.Minimum/10);
				d.Max = +(d.Maximum/10);
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.Date; }));
    y.domain([-10, d3.max(data, function(d) { return Math.max(d.Av, d.Max); })]);

    // Add the paths for the different temperature lines
    svg.append("path")
        .attr("class", "line")
        .style("stroke", "blue")
        .attr("d", AVline(data));

		svg.append("path")
				.attr("class", "line")
				.style("stroke", "red")
				.attr("d", MINline(data));

		svg.append("path")
				.attr("class", "line")
				.style("stroke", "green")
				.attr("d", MAXline(data));

    // Add the scatterplot for the different temperature lines
    svg.selectAll("dot")
        .data(data)
    .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.Date); })
        .attr("cy", function(d) { return y(d.Av); })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(formatTime(d.Date) + "<br/>"  + d.Av + "℃")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        });

				svg.selectAll("dot")
		        .data(data)
		    .enter().append("circle")
		        .attr("r", 5)
		        .attr("cx", function(d) { return x(d.Date); })
		        .attr("cy", function(d) { return y(d.Min); })
		        .on("mouseover", function(d) {
		            div.transition()
		                .duration(200)
		                .style("opacity", .9);
		            div	.html(formatTime(d.Date) + "<br/>"  + d.Min + "℃")
		                .style("left", (d3.event.pageX) + "px")
		                .style("top", (d3.event.pageY - 28) + "px");
		            })
		        .on("mouseout", function(d) {
		            div.transition()
		                .duration(200)
		                .style("opacity", 0);
		        });

				svg.selectAll("dot")
						.data(data)
				.enter().append("circle")
						.attr("r", 5)
						.attr("cx", function(d) { return x(d.Date); })
						.attr("cy", function(d) { return y(d.Max); })
						.on("mouseover", function(d) {
								div.transition()
										.duration(200)
										.style("opacity", .9);
								div	.html(formatTime(d.Date) + "<br/>"  + d.Max + "℃")
										.style("left", (d3.event.pageX) + "px")
										.style("top", (d3.event.pageY - 28) + "px");
								})
						.on("mouseout", function(d) {
								div.transition()
										.duration(200)
										.style("opacity", 0);
								});

    // Creates the X Axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Creates the Y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
        .text("Temperature (℃)");

      })
});

/*
Pim de Waard
5894778
*/

// constant for deviding the population numbers by a milion
const milion = 1000000

var margin = {top: 20, right: 5, bottom: 75, left: 75},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// creates ordinal scale for x
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

// creates linear scale for y
var y = d3.scale.linear()
    .range([height, 0]);

// creating x and y axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// creates element that pops up when hovering over bars in chart
var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Population:</strong> <span style='color:green'>" + d.Population + "</span>";
      })

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chart.call(tip);

// function that loads asynchronously the data from the json file
d3.json("top20city.json", function(error, data) {

        data.forEach(function(d) {
          d.City = d.City;
          d.Population = +d.Population/milion;
          console.log(d.City)
          console.log(d.Population)
        });

  x.domain(data.map(function(d) { return d.City; }));
  y.domain([0, d3.max(data, function(d) { return d.Population; })]);

  // creating class x axis with rotated text on 45 degrees because text on axis was too long for good represenation of data
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start");

  // creating class y axis
  chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.4em")
        .style("text-anchor", "end")
        .text("Inhabitants (in milions )");

  // creating class for bars with the corresponding data from the json
  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.City); })
      .attr("y", function(d) { return y(d.Population); })
      .attr("height", function(d) { return height - y(d.Population); })
      .attr("width", x.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
});

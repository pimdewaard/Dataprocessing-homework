/*
 * Pim de Waard
 * 5894778
 * Data processing
 */
var countries;
var jsonfile;
d3.selectAll(".m")
    .on("click", function() {
        var year = this.getAttribute("value");


        if (year == "2014") {
            newdata("life_exp_14.json")
        } else if (year == "2013") {
            newdata("life_exp_13.json")
        } else if (year == "2012") {
            newdata("life_exp_12.json")
        } else if (year == "2011") {
            newdata("life_exp_11.json")
        } else if (year == "2010") {
            newdata("life_exp_10.json")
        }

    });

function newdata(newjson) {

    document.getElementById("basic").innerHTML = "";
    jsonfile = newjson
}

// creates variable with datamap and searches for the matching "basic" id
var map = new Datamap({
    element: document.getElementById("basic"),
    projection: 'mercator',

    dataUrl: "life_exp_14.json",
    dataType: 'json',
    data: {},
    fills: {
        100: '#b10026',
        80: '#e31a1c',
        75: '#fc4e2a',
        70: '#fd8d3c',
        65: '#feb24c',
        60: '#fed976',
        55: '#ffeda0',
        50: '#ffffcc',

        defaultFill: '#00ff00'
    },
    geographyConfig: {

        popupTemplate: function(geo, data) {
            // if there is no data for country where mouse is hovering over then this text is showed
            if (data == null) {
                return ['<div class="hoverinfo"><strong>',
                    'No data available for ' + geo.properties.name,
                    '</strong></div>'
                ].join('');
            }
            // if there is data for country where mouse is hovering over then this text is showed
            else {
                return ['<div class="hoverinfo"><strong>',
                    'Life expectancy in ' + geo.properties.name,
                    ': ' + data.Life_expectancy,
                    '</strong></div>'
                ].join('');

            }
        }


    },
    done: function(map) {
        map.svg.selectAll('.datamaps-subunit').on('click', function(geo) {

            countryclick(geo.id)

        })
    }

});


// make legend
map.legend({
    legendTitle: "Average life expectancy in years ",
    defaultFillName: "No data",
    labels: {
        50: "<50",
        55: "50-55",
        60: "55-60",
        65: "60-65",
        70: "65-70",
        75: "70-75",
        80: "75-80",
        100: ">80",
    }
});


var width = 500,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#e41a1c", "#4daf4a", "#377eb8"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        return d.percentage;
    });

var svg = d3.select("body").append("svg")
    .attr("id", "piechart")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



function countryclick(countrycode) {
    svg.selectAll("*").remove();
    d3.json("expenditure14.json", function(data) {
        var piedata = []
        var x = data[countrycode]

        console.log(x)

        piedata.push({
            "label": "Pocket",
            "percentage": x.pocket
        }, {
            "label": "Public",
            "percentage": x.public
        }, {
            "label": "Other",
            "percentage": x.other
        })
        console.log(piedata)

        var g = svg.selectAll(".arc")
            .data(pie(piedata))
            .enter().append("g")
            .attr("class", "arc")
            .on("mouseover", function (d) {
        d3.select("#tooltip")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .style("opacity", 1)
            .select("#value")
            .text(d.data.label + " expenditure");
    })
        .on("mouseout", function () {
        // Hide the tooltip
        d3.select("#tooltip")
            .style("opacity", 0);;
    });

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                return color(d.data.label);
            });

        g.append("text")
            .attr("transform", function(d) {
                return "translate(" + labelArc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .text(function(d) {
                return d.data.percentage.toFixed(2) + "%";
            });



    })
};

function type(d) {
    d.percentage = +d.percentage;
    return d;
}

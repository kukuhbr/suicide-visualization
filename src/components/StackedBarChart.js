import React, { Component } from 'react';
import * as d3 from 'd3';

class StackedBarChart extends Component {
  constructor(props){
    super(props)
    //this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if(prevProps != null){
      if(prevProps.selected !== this.props.selected ) {
        console.log("Bangcat");
        document.getElementById("barchart").remove();
        this.drawChart();
      }
    }
  }



  componentDidMount() {
    this.drawChart()
  }

  drawChart() {
    var margin = {top: 100, right: 250, bottom: 35, left: 200};
    var width = 1050 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    //let height = this.props.height;
    //let width = this.props.width;

    var data = [
      { year: "0-14",  low: "1.456",  lowmid: "5.895",   midhigh: "2.028",    high: "0.886" },
      { year: "15-29", low: "16.408", lowmid: "147.427", midhigh: "57.457",   high: "36.052"},
      { year: "30-49", low: "17.086", lowmid: "136.78",  midhigh: "119.823",  high: "86.381"},
      { year: "50-59", low: "6.781",  lowmid: "45.306",  midhigh: "65.019",   high: "53.632"},
      { year: "60-69", low: "6.077",  lowmid: "33.423",  midhigh: "67.861",   high: "36.316"},
      { year: "70+",   low: "8.36",   lowmid: "29.925",  midhigh: "79.193",   high: "49.126"},
    ];

    var datalow = [
      { year: "0-14",  low: "1.456", },
      { year: "15-29", low: "16.408",},
      { year: "30-49", low: "17.086",},
      { year: "50-59", low: "6.781", },
      { year: "60-69", low: "6.077", },
      { year: "70+",   low: "8.36",  },
    ];

    var datalowmid = [
      { year: "0-14",  lowmid: "5.895",  },
      { year: "15-29", lowmid: "147.427",},
      { year: "30-49", lowmid: "136.78", },
      { year: "50-59", lowmid: "45.306", },
      { year: "60-69", lowmid: "33.423", },
      { year: "70+",   lowmid: "29.925", },
    ];

    var datamidhigh = [
      { year: "0-14",  midhigh: "2.028",  },
      { year: "15-29", midhigh: "57.457", },
      { year: "30-49", midhigh: "119.823",},
      { year: "50-59", midhigh: "65.019", },
      { year: "60-69", midhigh: "67.861", },
      { year: "70+",   midhigh: "79.193", },
    ];

    var datahigh = [
      { year: "0-14",  high: "0.886" },
      { year: "15-29", high: "36.052"},
      { year: "30-49", high: "86.381"},
      { year: "50-59", high: "53.632"},
      { year: "60-69", high: "36.316"},
      { year: "70+",   high: "49.126"},
    ];

    var active_link = "0"; //to control legend selections and hover
    var legendClicked; //to control legend selections
    var legendClassArray = []; //store legend classes to select bars in plotSingle()
    var y_orig; //to store original y-posn
    var used;
    var arr;
    var colors;

    if(this.props.selected == 'High Income Country') {
      used = datahigh;
      arr = ["high"];
      colors = ["#225c34"];
    } else if (this.props.selected == 'Upper Middle Income Country') {
      used = datamidhigh;
      arr = ["midhigh"];
      colors = ["#058e3b"];
    } else if (this.props.selected == 'Lower Middle Income Country') {
      used = datalowmid;
      arr = ["lowmid"];
      colors = ["#1ab360"];
    } else if (this.props.selected == 'Low Income Country') {
      used = datalow;
      arr = ["low"];
      colors = ["#8fcea3"];
    } else {
      used = data;
      arr = ["low", "lowmid", "midhigh", "high"];
      colors = ["#8fcea3", "#1ab360", "#058e3b", "#225c34"];
    }

    var dataset = d3.layout.stack()(arr.map(function(group) {
      return used.map(function(d) {
        return {x: d.year, y: +d[group]};
      });
    }));

    console.log(dataset[0]);

    // Set x, y, and colors
    var x = d3.scale.ordinal()
      .domain(dataset[0].map(function(d) { return d.x; }))
      .rangeRoundBands([10, width-10], 0.02);

    //console.log(d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; })}));

    var y = d3.scale.linear()
      .domain([0, 360])
      .range([height, 0]);



    // Define and draw axes
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat( function(d) { return d } );

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var svg = d3.select("#containerb").append("svg")
      .attr("id", "barchart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + 75 + "," + margin.top + ")");


    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("text")      // text label for the x axis
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .style("text-anchor", "middle")
      .text("Age Group");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0- (height/2))
      .attr("y", -50)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Estimated Death (in thousand)");

    if(this.props.selected !== 'all'){
      svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("text-decoration", "underline")
      .text(this.props.selected + " Suicide Rate");
    } else {
      svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("text-decoration", "underline")
      .text("All Income Country Suicide Rate");
    }

    /*
    svg.append("text")      // text label for the x axis
      .attr("x", 100- margin.left)
      .attr("y",(height / 2))
      //.attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Estimated Death (in thousand)");
    */
    // Create groups for each series, rects for each segment

    var groups = svg.selectAll("g.n")
      .data(dataset)
      .enter().append("g")
      .attr("class", "n")
      .style("fill", function(d, i) { return colors[i]; });

    var rect = groups.selectAll("rect")
      .data(function(d) { return d; })
      .enter()
      .append("rect")
      .attr("class", function(d) {
        console.log(d);
        var classLabel = d.x; //remove spaces
        return "class" + classLabel;
      })
      .attr("x", function(d) { return x(d.x)+20; })
      .attr("y", function(d) { return y(d.y0 + d.y); })
      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
      .attr("width", x.rangeBand()-40)
      .on("mouseover", function() { tooltip.style("display", null); })
      .on("mouseout", function() { tooltip.style("display", "none"); })
      .on("mousemove", function(d) {
        var xPosition = d3.mouse(this)[0] - 15;
        var yPosition = d3.mouse(this)[1] - 25;
        tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        tooltip.select("text").text(d.y);
      });
/*
    // Draw legend
    var legend = svg.selectAll(".legend")
      .data(colors)
      .enter().append("g")
      .attr("class", function(d) {
        legendClassArray.push(d.replace(/\s/g, ''));
        return "legend";
      })
      .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) {return colors.slice().reverse()[i];})
      .attr("id", function (d, i) {
        console.log(d + " " + i);
        return "id" + d.replace(/\s/g, '');
      })
      .on("mouseover",function(){
        if (active_link === "0") d3.select(this).style("cursor", "pointer");
        else {
          if (active_link.split("class").pop() === this.id.split("id").pop()) {
            d3.select(this).style("cursor", "pointer");
          } else d3.select(this).style("cursor", "auto");
        }
      })
      .on("click",function(d){
        if (active_link === "0") { //nothing selected, turn on this selection
          d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 2);

            active_link = this.id.split("id").pop();
            plotSingle(this);

            //gray out the others
            for (var i = 0; i < legendClassArray.length; i++) {
              console.log("active link : " + active_link);
              console.log(legendClassArray[i]);
              if (legendClassArray[i] != active_link) {
                document.getElementById("id" + legendClassArray[i])
                  .style.opacity= 0.5;
              }
            }

        } else { //deactivate
          if (active_link === this.id.split("id").pop()) {//active square selected; turn it OFF
            d3.select(this)
              .style("stroke", "none");

            active_link = "0"; //reset

            //restore remaining boxes to normal opacity
            for (var i = 0; i < legendClassArray.length; i++) {
              document.getElementById("id" + legendClassArray[i])
                  .style.opacity= 1;
              //d3.select("#id" + legendClassArray[i])
                //  .style("opacity", 1);
            }

            //restore plot to original
            //restorePlot(d);

          }

        } //end active_link check
      });

    legend.append("text")
      .attr("x", width + 5)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d, i) {
        switch (i) {
          case 0: return "High Income countries";
          case 1: return "Upper Middle Income Countries";
          case 2: return "Lower Middle Income Countries";
          case 3: return "Low Income Countries";
        }
    });
    */

    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip.append("rect")
      .attr("width", 50)
      .attr("height", 20)
      .attr("fill", "#EFFFEF")
      .style("opacity", 0.8);

    tooltip.append("text")
      .attr("x", 25)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

  }


  render() {
    return(
      <div id="containerb" style={{
        height: "75vh",
        width: "45vw",
        display: "block",
        background: 'linear-gradient(to right, #FFFFFF, #eee)',
        borderRadius: '0 15px 15px 0',
      }}>
      </div>
    );
  }
}

export default StackedBarChart;
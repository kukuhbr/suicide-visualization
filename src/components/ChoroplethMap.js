import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import * as d3 from 'd3';
//import {event as d3Event} from 'd3-selection';
//import {zoom as d3Zoom} from 'd3-zoom';

class ChoroplethMap extends Component {
  componentDidMount() {
    let dataset = {};
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;

    let onlyValues = this.props.data.map(function (obj) { return obj[1]; });
    onlyValues = onlyValues.filter(function(x) {
      return x < 15;
    });
    let minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues);

    let paletteScale = d3.scale.linear()
    .domain([minValue, maxValue])
    .range(["#FFEFEF", "#8a2323"]);

    this.props.data.forEach(function (item) { //
      // item example value ["AFG", 252777778]
      let iso = item[0],
          value = item[1];
      if(value >= 15)
        dataset[iso] = { numberOfThings: value, fillColor: "#8a0101" };
      else
        dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
  });
    for (var i = 0, j = countries.length; i < j; i++) {
      console.log(countries[i].id, countries[i].properties.name);
    }
    let map = new Datamap({
      element: document.getElementById('container'),
      fills: {
          HIGH: '#afafaf',
          LOW: '#123456',
          MEDIUM: 'blue',
          UNKNOWN: 'rgb(0,0,0)',
          defaultFill: '#eee'
      },
      data: dataset,
      setProjection: function (element) {
        var projection = d3.geo.mercator()
          .scale(100)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

        var path = d3.geo.path().projection(projection);
        return { path: path, projection: projection };
      },
      done: function (element) {
        element.svg.call(d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", () => {
          let t = d3.event.translate.join(",");
          let s = d3.event.scale;
          element.svg.select("g").attr("transform",  "translate(" + t + ")scale(" + s + ")");

        }));
      }
    });
  }

  render() {
    return (
      <div id="container" style={{
        height: "100vh",
        width: "100vw",
      }}>
      </div>
    );
  }
}

export default ChoroplethMap;
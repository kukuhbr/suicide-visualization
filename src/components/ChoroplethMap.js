import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import * as d3 from 'd3';
//import {event as d3Event} from 'd3-selection';
//import {zoom as d3Zoom} from 'd3-zoom';

class ChoroplethMap extends Component {
  componentDidMount() {
    let dataset = {};
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;
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
      data: {
        "USA": { "fillColor": "#42a844"}
      },
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
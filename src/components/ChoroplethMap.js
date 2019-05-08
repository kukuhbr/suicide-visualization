import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import * as d3 from 'd3';

class ChoroplethMap extends Component {
  componentDidMount() {
    let dataset = {};
    let map = new Datamap({
      element: document.getElementById('container'),
      setProjection: function (element) {
        var projection = d3.geoMercator()
          .scale(100)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

        var path = d3.geoPath().projection(projection);
        return { path: path, projection: projection };
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
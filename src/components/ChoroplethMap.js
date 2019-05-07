import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';

class ChoroplethMap extends Component {
  componentDidMount() {
    let dataset = {};
    let map = new Datamap({element: document.getElementById('container')});
  }

  render() {
    return (
      <div id="container" style={{
        height: "100%",
        width: "100%",
      }}>
      </div>
    );
  }
}

export default ChoroplethMap;
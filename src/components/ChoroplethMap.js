import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import * as d3 from 'd3';
//import {event as d3Event} from 'd3-selection';
//import {zoom as d3Zoom} from 'd3-zoom';

class ChoroplethMap extends Component {
  numberWithComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
        "USA": { "fillColor": "rgba(255,48,25,1)", "suicide": 1200000 }
      },
      geographyConfig: {
        borderColor: '#FFFFFF',
        highlightBorderWidth: 3,
        highlightBorderColor: 'rgba(207,4,4,1)',
        highlightFillColor: function(geo) {
          return geo['fillColor'] || '#F5F5F5';
        },
        popupTemplate: function(geo, data) {
          //if (!data) { return ; }
          let html = [
            '<fieldset class="hover-container">',
            '<legend>', geo.properties.name, '</legend>',
          ].join('');

          if (data) {
            html += [
              '<div>', data.suicide.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), ' suicides in 2016', '</div>',
              '<div>', Math.round(data.suicide/365).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), ' suicide(s) each day', '</div>',
            ].join('');
          } else {
            html += [
              '<div> Not Available </div>',
            ].join('');
          }
          html += '</fieldset>'

          return html;
        }
      },
      setProjection: function (element) {
        var projection = d3.geo.mercator()
          .scale(150)
          .translate([element.offsetWidth / 2, element.offsetHeight*1.3 / 2]);

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
        height: "70vh",
        width: "80vw",
        display: "block",
        margin: "auto",
        background: 'linear-gradient(#02081a, #86838c)'
      }}>
      </div>
    );
  }
}

export default ChoroplethMap;
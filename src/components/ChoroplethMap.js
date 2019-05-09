import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import * as d3 from 'd3';
import Grid from '@material-ui/core/Grid';
//import {event as d3Event} from 'd3-selection';
//import {zoom as d3Zoom} from 'd3-zoom';

class ChoroplethMap extends Component {
  numberWithComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount() {
    let dataset = {};
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;

    let onlyValues = this.props.data.map(function (obj) { return obj[1]; });
    onlyValues = onlyValues.filter(function(x) {
      return x < 30;
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
      if(value >= 30)
        dataset[iso] = { suicide: value, fillColor: "#8a0101" };
      else
        dataset[iso] = { suicide: value, fillColor: paletteScale(value) };
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
      geographyConfig: {
        borderColor: '#02081a',
        highlightBorderWidth: 3,
        highlightBorderColor: '#fff',
        highlightFillColor: function(geo) {
          return geo['fillColor'] || '#F5F5F5';
        },
        popupTemplate: function(geo, data) {
          let html = [
            '<fieldset class="hover-container">',
            '<legend>', geo.properties.name, '</legend>',
          ].join('');

          if (data) {
            html += [
              '<span class="numbers">', data.suicide, '</span>',
              '<span>', ' suicide cases', '</span>',
              '<div>', 'in 100,000 population', '</div>',
              //'<div>', Math.round(data.suicide/365).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), ' suicide(s) each day', '</div>',
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
          .scale(130)
          .translate([element.offsetWidth / 2, element.offsetHeight*1.4 / 2]);

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
      <div>
        <Grid container spacing={16}>
          <Grid item xs={9}>
            <div id="container" style={{
              height: "75vh",
              width: "70vw",
              display: "block",
              background: 'linear-gradient(#02081a, #86838c)',
              borderRadius: '15px',
            }}>
            </div>
          </Grid>
      
          <Grid item xs={3}>
            <div>
              <p>Global Suicide Rates</p>
              <p>10.7 per 100,000 population </p>
              <p>786047 death by suicide in 2016</p>
              <p>Global Suicide Percetage </p>
            </div>
          </Grid>
      </Grid>
        
    </div>
    );
  }
}

export default ChoroplethMap;
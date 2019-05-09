import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import * as d3 from 'd3';
import Test from './Layouts/test';
import Grid from '@material-ui/core/Grid';
import StackedBarChart from './StackedBarChart';
//import {event as d3Event} from 'd3-selection';
//import {zoom as d3Zoom} from 'd3-zoom';

class IncomeMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: 'all',
        };
    }

  numberWithComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount() {
    let dataset = {};
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;

    this.props.data.forEach(function (item) { //
      // item example value ["AFG", 252777778]
      let iso = item[0],
          value = item[1];
      if(value == 'LI')
        dataset[iso] = { income: "Low Income Country", fillKey: 'LOW' };
      else if(value == 'LMI')
        dataset[iso] = { income: "Lower Middle Income Country", fillKey: 'MEDIUMLOW' };
        else if(value == 'UMI')
        dataset[iso] = { income: "Upper Middle Income Country", fillKey: 'MEDIUMHIGH' };
        else if(value == 'UI')
        dataset[iso] = { income: "High Income Country", fillKey: 'HIGH' };
  });

    let map = new Datamap({
      element: document.getElementById('container'),
      fills: {
          HIGH: '#225c34',
          LOW: '#8fcea3',
          MEDIUMHIGH: '#058e3b',
          MEDIUMLOW: '#1ab360',
          UNKNOWN: 'rgb(0,0,0)',
          background: '#eee',
          defaultFill: '#eee'
      },
      data: dataset,
      geographyConfig: {
        borderColor: '#FFFFFF',
        highlightBorderWidth: 2,
        highlightBorderColor: '#11FF11',
        highlightFillColor: function(geo) {
          return geo['fillKey'] || '#F5F5F5';
        },
        popupTemplate: function(geo, data) {
          let html = [
            '<fieldset class="hover-container-alternative">',
            '<legend class="legend-alternative">', geo.properties.name, '</legend>',
          ].join('');

          if (data) {
            html += [
              '<span>', data.income, '</span>',
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

        element.svg.selectAll('.datamaps-subunit').on('click', function(geo) {
            var clicked = false;
            var change = false;
            if(element.options.data[geo.id] !== undefined){
                if(element.options.data[geo.id].fillKey == 'background'){
                    change = true;
                } else {
                    for(var obj in dataset){
                        if(dataset.hasOwnProperty(obj)){
                            if(dataset[obj].income != element.options.data[geo.id].income)
                            {
                                if(dataset[obj].fillKey == 'background'){
                                    clicked = true;
                                }
                                break;
                            }
                        }
                    }
                }
                for(var obj in dataset){
                    if(dataset.hasOwnProperty(obj)){
                        if(clicked){
                            if(dataset[obj].income == 'Low Income Country')
                                dataset[obj].fillKey = 'LOW';
                            else if(dataset[obj].income == 'Lower Middle Income Country')
                                dataset[obj].fillKey = 'MEDIUMLOW';
                            else if(dataset[obj].income == 'Upper Middle Income Country')
                                dataset[obj].fillKey = 'MEDIUMHIGH';
                            else if(dataset[obj].income == 'High Income Country')
                                dataset[obj].fillKey = 'HIGH';
                        } else if (change == true){
                            if(dataset[obj].income == element.options.data[geo.id].income)
                            {
                                if(dataset[obj].income == 'Low Income Country')
                                    dataset[obj].fillKey = 'LOW';
                                else if(dataset[obj].income == 'Lower Middle Income Country')
                                    dataset[obj].fillKey = 'MEDIUMLOW';
                                else if(dataset[obj].income == 'Upper Middle Income Country')
                                    dataset[obj].fillKey = 'MEDIUMHIGH';
                                else if(dataset[obj].income == 'High Income Country')
                                    dataset[obj].fillKey = 'HIGH';
                            } else {
                                dataset[obj].fillKey = 'background';
                            }
                        } else {
                            if(element.options.data[geo.id].income != dataset[obj].income)
                                dataset[obj].fillKey = 'background';
                        }
                    }
                }
                if(clicked)
                    this.setState({selected: 'all'});
                else
                    this.setState({selected: element.options.data[geo.id].income})
                element.updateChoropleth(dataset);
            }
        }.bind(this));
      }.bind(this)
    });
  }

  render() {
    return (
    <div>
        <Grid container spacing={16}>
            <Grid item xs={6}>
                <div id="container" style={{
                    height: "75vh",
                    width: "50vw",
                    display: "block",
                    background: 'linear-gradient(to left, #FFFFFF, #eee)',
                    borderRadius: '15px',
                }}>
                </div>
            </Grid>
            <Grid item xs={6}>
                <StackedBarChart height='400' width='1000' selected={this.state.selected}/>
            </Grid>
        </Grid>

    </div>

    );
  }
}

export default IncomeMap;
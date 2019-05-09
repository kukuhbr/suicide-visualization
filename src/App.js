import React, { Component } from 'react';
import logo from './logo.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChoroplethMap from './components/ChoroplethMap';
import StackedBarChart from './components/StackedBarChart';
import Header from './components/Layouts/Header';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import './styles.css';
import './App.css';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default class extends Component{
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    value: 0,
    data:[["AFG", 6.4], ["ALB", 5.6], ["DZA", 3.3], ["AGO", 8.9], ["ATG", 0.5], ["ARG", 9.1], ["ARM", 5.7], ["AUS", 11.7], ["AUT", 11.4], ["AZE", 2.6], ["BHS", 1.6], ["BHR", 5.7], ["BGD", 6.1], ["BRB", 0.4], ["BLR", 21.4], ["BEL", 15.7], ["BLZ", 5.9], ["BEN", 15.7], ["BTN", 11.6], ["BOL", 12.9], ["BIH", 6.4], ["BWA", 11.5], ["BRA", 6.1], ["BRN", 4.5], ["BGR", 7.9], ["BFA", 14.8], ["BDI", 15.0], ["CPV", 15.1], ["KHM", 5.9], ["CMR", 19.5], ["CAN", 10.4], ["CAF", 11.6], ["TCD", 15.5], ["CHL", 9.7], ["CHN", 8.0], ["COL", 7.0], ["COM", 11.1], ["COG", 9.3], ["CRI", 7.5], ["CIV", 23.0], ["HRV", 11.5], ["CUB", 10.1], ["CYP", 4.5], ["CZE", 10.5], ["PRK", 10.6], ["COD", 9.7], ["DNK", 9.2], ["DJI", 8.5], ["DOM", 10.5], ["ECU", 7.2], ["EGY", 4.4], ["SLV", 13.5], ["GNQ", 22.0], ["ERI", 13.8], ["EST", 14.4], ["SWZ", 16.7], ["ETH", 11.4], ["FJI", 5.5], ["FIN", 13.8], ["FRA", 12.1], ["GAB", 9.6], ["GMB", 10.0], ["GEO", 6.7], ["DEU", 9.1], ["GHA", 8.7], ["GRC", 3.8], ["GRD", 1.7], ["GTM", 2.9], ["GIN", 10.5], ["GNB", 7.4], ["GUY", 30.2], ["HTI", 12.2], ["HND", 3.4], ["HUN", 13.6], ["ISL", 13.3], ["IND", 16.5], ["IDN", 3.7], ["IRN", 4.0], ["IRQ", 4.1], ["IRL", 10.9], ["ISR", 5.2], ["ITA", 5.5], ["JAM", 2.0], ["JPN", 14.3], ["JOR", 3.7], ["KAZ", 22.8], ["KEN", 5.6], ["KIR", 15.2], ["KWT", 2.2], ["KGZ", 9.1], ["LAO", 9.3], ["LVA", 17.2], ["LBN", 3.2], ["LSO", 28.9], ["LBR", 13.4], ["LBY", 5.5], ["LTU", 25.7], ["LUX", 10.4], ["MDG", 6.9], ["MWI", 7.8], ["MYS", 6.2], ["MDV", 2.7], ["MLI", 8.9], ["MLT", 6.5], ["MRT", 7.5], ["MUS", 7.3], ["MEX", 5.2], ["FSM", 11.3], ["MNG", 13.3], ["MNE", 7.9], ["MAR", 3.1], ["MOZ", 8.4], ["MMR", 8.1], ["NAM", 11.5], ["NPL", 9.6], ["NLD", 9.6], ["NZL", 11.6], ["NIC", 11.9], ["NER", 9.0], ["NGA", 17.3], ["NOR", 10.1], ["OMN", 3.5], ["PAK", 3.1], ["PAN", 4.4], ["PNG", 7.0], ["PRY", 9.3], ["PER", 5.1], ["PHL", 3.7], ["POL", 13.4], ["PRT", 8.6], ["QAT", 5.8], ["KOR", 20.2], ["MDA", 13.4], ["ROU", 8.0], ["RUS", 26.5], ["RWA", 11.0], ["LCA", 7.3], ["VCT", 2.4], ["WSM", 5.4], ["STP", 3.1], ["SAU", 3.4], ["SEN", 11.8], ["SRB", 10.9], ["SYC", 8.3], ["SLE", 16.1], ["SGP", 7.9], ["SVK", 10.1], ["SVN", 13.3], ["SLB", 5.9], ["SOM", 8.3], ["ZAF", 12.8], ["SSD", 6.1], ["ESP", 6.1], ["LKA", 14.2], ["SDN", 9.5], ["SUR", 23.2], ["SWE", 11.7], ["CHE", 11.3], ["SYR", 2.4], ["TJK", 3.3], ["THA", 12.9], ["MKD", 6.2], ["TLS", 6.4], ["TGO", 16.6], ["TON", 4.0], ["TTO", 12.9], ["TUN", 3.2], ["TUR", 7.2], ["TKM", 7.2], ["UGA", 20.0], ["UKR", 18.5], ["ARE", 2.7], ["GBR", 7.6], ["TZA", 9.6], ["USA", 13.7], ["URY", 16.5], ["UZB", 7.4], ["VUT", 5.4], ["VEN", 3.8], ["VNM", 7.0], ["YEM", 9.8], ["ZMB", 11.3], ["ZWE", 19.1]]
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Header />
          <Tabs value={value} onChange={this.handleChange}>
            <Tab style={{fontFamily: 'Comic Sans MS'}} label="By Country" />
            <Tab style={{fontFamily: 'Comic Sans MS'}} label="Item Two" />
            <Tab style={{fontFamily: 'Comic Sans MS'}} label="Item Three" />
          </Tabs>
          {value === 0 && <TabContainer><ChoroplethMap data={this.state.data} /></TabContainer>}
          {value === 1 && <TabContainer><StackedBarChart height='400' width='1000' /></TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}



      </div>
    );
  }
}

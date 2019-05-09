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
import IncomeMap from './components/IncomeMap';


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
    data:[["AFG", 12.8], ["ALB", 11.2], ["DZA", 6.6], ["AGO", 17.8], ["ATG", 1.0], ["ARG", 18.2], ["ARM", 11.4], ["AUS", 23.4], ["AUT", 22.8], ["AZE", 5.2], ["BHS", 3.2], ["BHR", 11.4], ["BGD", 12.2], ["BRB", 0.8], ["BLR", 42.8], ["BEL", 31.4], ["BLZ", 11.8], ["BEN", 31.4], ["BTN", 23.2], ["BOL", 25.8], ["BIH", 12.8], ["BWA", 23.0], ["BRA", 12.2], ["BRN", 9.0], ["BGR", 15.8], ["BFA", 29.6], ["BDI", 30.0], ["CPV", 30.2], ["KHM", 11.8], ["CMR", 39.0], ["CAN", 20.8], ["CAF", 23.2], ["TCD", 31.0], ["CHL", 19.4], ["CHN", 16.0], ["COL", 14.0], ["COM", 22.2], ["COG", 18.6], ["CRI", 15.0], ["CIV", 46.0], ["HRV", 23.0], ["CUB", 20.2], ["CYP", 9.0], ["CZE", 21.0], ["PRK", 21.2], ["COD", 19.4], ["DNK", 18.4], ["DJI", 17.0], ["DOM", 21.0], ["ECU", 14.4], ["EGY", 8.8], ["SLV", 27.0], ["GNQ", 44.0], ["ERI", 27.6], ["EST", 28.8], ["SWZ", 33.4], ["ETH", 22.8], ["FJI", 11.0], ["FIN", 27.6], ["FRA", 24.2], ["GAB", 19.2], ["GMB", 20.0], ["GEO", 13.4], ["DEU", 18.2], ["GHA", 17.4], ["GRC", 7.6], ["GRD", 3.4], ["GTM", 5.8], ["GIN", 21.0], ["GNB", 14.8], ["GUY", 60.4], ["HTI", 24.4], ["HND", 6.8], ["HUN", 27.2], ["ISL", 26.6], ["IND", 33.0], ["IDN", 7.4], ["IRN", 8.0], ["IRQ", 8.2], ["IRL", 21.8], ["ISR", 10.4], ["ITA", 11.0], ["JAM", 4.0], ["JPN", 28.6], ["JOR", 7.4], ["KAZ", 45.6], ["KEN", 11.2], ["KIR", 30.4], ["KWT", 4.4], ["KGZ", 18.2], ["LAO", 18.6], ["LVA", 34.4], ["LBN", 6.4], ["LSO", 57.8], ["LBR", 26.8], ["LBY", 11.0], ["LTU", 51.4], ["LUX", 20.8], ["MDG", 13.8], ["MWI", 15.6], ["MYS", 12.4], ["MDV", 5.4], ["MLI", 17.8], ["MLT", 13.0], ["MRT", 15.0], ["MUS", 14.6], ["MEX", 10.4], ["FSM", 22.6], ["MNG", 26.6], ["MNE", 15.8], ["MAR", 6.2], ["MOZ", 16.8], ["MMR", 16.2], ["NAM", 23.0], ["NPL", 19.2], ["NLD", 19.2], ["NZL", 23.2], ["NIC", 23.8], ["NER", 18.0], ["NGA", 34.6], ["NOR", 20.2], ["OMN", 7.0], ["PAK", 6.2], ["PAN", 8.8], ["PNG", 14.0], ["PRY", 18.6], ["PER", 10.2], ["PHL", 7.4], ["POL", 26.8], ["PRT", 17.2], ["QAT", 11.6], ["KOR", 40.4], ["MDA", 26.8], ["ROU", 16.0], ["RUS", 53.0], ["RWA", 22.0], ["LCA", 14.6], ["VCT", 4.8], ["WSM", 10.8], ["STP", 6.2], ["SAU", 6.8], ["SEN", 23.6], ["SRB", 21.8], ["SYC", 16.6], ["SLE", 32.2], ["SGP", 15.8], ["SVK", 20.2], ["SVN", 26.6], ["SLB", 11.8], ["SOM", 16.6], ["ZAF", 25.6], ["SSD", 12.2], ["ESP", 12.2], ["LKA", 28.4], ["SDN", 19.0], ["SUR", 46.4], ["SWE", 23.4], ["CHE", 22.6], ["SYR", 4.8], ["TJK", 6.6], ["THA", 25.8], ["MKD", 12.4], ["TLS", 12.8], ["TGO", 33.2], ["TON", 8.0], ["TTO", 25.8], ["TUN", 6.4], ["TUR", 14.4], ["TKM", 14.4], ["UGA", 40.0], ["UKR", 37.0], ["ARE", 5.4], ["GBR", 15.2], ["TZA", 19.2], ["USA", 27.4], ["URY", 33.0], ["UZB", 14.8], ["VUT", 10.8], ["VEN", 7.6], ["VNM", 14.0], ["YEM", 19.6], ["ZMB", 22.6], ["ZWE", 38.2]],
    income:[['AFG', 'LI'], ['BEN', 'LI'], ['BFA', 'LI'], ['BDI', 'LI'], ['CAF', 'LI'], ['TCD', 'LI'], ['COM', 'LI'], ['PRK', 'LI'], ['COD', 'LI'], ['ERI', 'LI'], ['ETH', 'LI'], ['GMB', 'LI'], ['GIN', 'LI'], ['GNB', 'LI'], ['HTI', 'LI'], ['LBR', 'LI'], ['MDG', 'LI'], ['MWI', 'LI'], ['MLI', 'LI'], ['MOZ', 'LI'], ['NPL', 'LI'], ['NER', 'LI'], ['RWA', 'LI'], ['SEN', 'LI'], ['SLE', 'LI'], ['SOM', 'LI'], ['SSD', 'LI'], ['TGO', 'LI'], ['UGA', 'LI'], ['TZA', 'LI'], ['ZWE', 'LI'], ['AGO', 'LMI'], ['ARM', 'LMI'], ['BGD', 'LMI'], ['BTN', 'LMI'], ['BOL', 'LMI'], ['CPV', 'LMI'], ['KHM', 'LMI'], ['CMR', 'LMI'], ['COG', 'LMI'], ['CIV', 'LMI'], ['DJI', 'LMI'], ['EGY', 'LMI'], ['SLV', 'LMI'], ['GEO', 'LMI'], ['GHA', 'LMI'], ['GTM', 'LMI'], ['HND', 'LMI'], ['IND', 'LMI'], ['IDN', 'LMI'], ['JOR', 'LMI'], ['KEN', 'LMI'], ['KIR', 'LMI'], ['KGZ', 'LMI'], ['LAO', 'LMI'], ['LSO', 'LMI'], ['MRT', 'LMI'], ['FSM', 'LMI'], ['MNG', 'LMI'], ['MAR', 'LMI'], ['MMR', 'LMI'], ['NIC', 'LMI'], ['NGA', 'LMI'], ['PAK', 'LMI'], ['PNG', 'LMI'], ['PHL', 'LMI'], ['MDA', 'LMI'], ['STP', 'LMI'], ['SLB', 'LMI'], ['LKA', 'LMI'], ['SDN', 'LMI'], ['SWZ', 'LMI'], ['SYR', 'LMI'], ['TJK', 'LMI'], ['TLS', 'LMI'], ['TUN', 'LMI'], ['UKR', 'LMI'], ['UZB', 'LMI'], ['VUT', 'LMI'], ['VNM', 'LMI'], ['PSE', 'LMI'], ['YEM', 'LMI'], ['ZMB', 'LMI'], ['ALB', 'UMI'], ['DZA', 'UMI'], ['ARG', 'UMI'], ['AZE', 'UMI'], ['BLR', 'UMI'], ['BLZ', 'UMI'], ['BIH', 'UMI'], ['BWA', 'UMI'], ['BRA', 'UMI'], ['BGR', 'UMI'], ['CHN', 'UMI'], ['COL', 'UMI'], ['CRI', 'UMI'], ['HRV', 'UMI'], ['CUB', 'UMI'], ['DOM', 'UMI'], ['ECU', 'UMI'], ['GNQ', 'UMI'], ['FJI', 'UMI'], ['GAB', 'UMI'], ['GRD', 'UMI'], ['GUY', 'UMI'], ['IRN', 'UMI'], ['IRQ', 'UMI'], ['JAM', 'UMI'], ['KAZ', 'UMI'], ['LBN', 'UMI'], ['LBY', 'UMI'], ['MYS', 'UMI'], ['MDV', 'UMI'], ['MUS', 'UMI'], ['MEX', 'UMI'], ['MNE', 'UMI'], ['NAM', 'UMI'], ['PAN', 'UMI'], ['PRY', 'UMI'], ['PER', 'UMI'], ['ROU', 'UMI'], ['RUS', 'UMI'], ['WSM', 'UMI'], ['LCA', 'UMI'], ['VCT', 'UMI'], ['SRB', 'UMI'], ['ZAF', 'UMI'], ['SUR', 'UMI'], ['THA', 'UMI'], ['MKD', 'UMI'], ['TON', 'UMI'], ['TUR', 'UMI'], ['TKM', 'UMI'], ['VEN', 'UMI'], ['ATG', 'UI'], ['AUS', 'UI'], ['AUT', 'UI'], ['BHS', 'UI'], ['BHR', 'UI'], ['BRB', 'UI'], ['BEL', 'UI'], ['BRN', 'UI'], ['CAN', 'UI'], ['CHL', 'UI'], ['CYP', 'UI'], ['CZE', 'UI'], ['DNK', 'UI'], ['EST', 'UI'], ['FIN', 'UI'], ['FRA', 'UI'], ['DEU', 'UI'], ['GRC', 'UI'], ['HUN', 'UI'], ['ISL', 'UI'], ['IRL', 'UI'], ['ISR', 'UI'], ['ITA', 'UI'], ['JPN', 'UI'], ['KWT', 'UI'], ['LVA', 'UI'], ['LTU', 'UI'], ['LUX', 'UI'], ['MLT', 'UI'], ['NLD', 'UI'], ['NZL', 'UI'], ['NOR', 'UI'], ['OMN', 'UI'], ['POL', 'UI'], ['PRT', 'UI'], ['PRI', 'UI'], ['QAT', 'UI'], ['KOR', 'UI'], ['SAU', 'UI'], ['SYC', 'UI'], ['SGP', 'UI'], ['SVK', 'UI'], ['SVN', 'UI'], ['ESP', 'UI'], ['SWE', 'UI'], ['CHE', 'UI'], ['TWN', 'UI'], ['TTO', 'UI'], ['ARE', 'UI'], ['GBR', 'UI'], ['USA', 'UI'], ['URY', 'UI']],
    selected: 'all'
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Header selected={this.state.selected}/>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab style={{fontFamily: "Tahoma"}} label="By Country" />
            <Tab style={{fontFamily: "Tahoma"}} label="By Income" />
          </Tabs>
          {value === 0 && <TabContainer><ChoroplethMap data={this.state.data} /></TabContainer>}
          {value === 1 && <TabContainer><IncomeMap data={this.state.income} selected={this.state.selected}/> </TabContainer>}

      </div>
    );
  }
}

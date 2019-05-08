import React, { Component } from 'react';
import logo from './logo.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChoroplethMap from './components/ChoroplethMap';
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
    data:[["AFG", 252777778], ["ALB", 2125], ["DZA", 127083333], ["ASM", 52083333], ["AGO", 339583333], ["ATG", 3472222], ["ARG", 375694444], ["ARM", 213194444], ["AUS", 463194444], ["AUT", 461111111], ["AZE", 875], ["BHM", 45833333], ["BHR", 213194444], ["BGD", 250694444], ["BRB", 2777778], ["BLR", 877777778], ["BEL", 629861111], ["BLZ", 214583333], ["BEN", 629861111], ["BTN", 4625], ["BOL", 50625], ["BIH", 252777778], ["BWA", 461805556], ["BRA", 250694444], ["BRN", 170138889], ["BGR", 297916667], ["BFA", 588888889], ["MMR", 334027778], ["CPV", 625694444], ["KHM", 214583333], ["CMR", 795138889], ["CAN", 419444444], ["CAF", 4625], ["TCD", 628472222], ["CHL", 379861111], ["COM", 459027778], ["COD", 379861111], ["COG", 377083333], ["CRI", 295138889], ["HRV", 461805556], ["CUB", 417361111], ["CYP", 170138889], ["CZE", 420138889], ["DNK", 376388889], ["DJI", 336805556], ["DOM", 420138889], ["ECU", 293055556], ["EGY", 169444444], ["SLV", 545138889], ["ERI", 547222222], ["EST", 586111111], ["ETH", 461111111], ["FJI", 211805556], ["FIN", 547222222], ["FRA", 500694444], ["GAB", 379166667], ["GEO", 254861111], ["DEU", 375694444], ["GHA", 338194444], ["GRC", 130555556], ["GRD", 46527778], ["GTM", 89583333], ["GNB", 294444444], ["GIN", 420138889], ["GUY", 251388889], ["HTI", 501388889], ["HND", 127777778], ["HUN", 545833333], ["ISL", 54375], ["IND", 670138889], ["IDN", 129861111], ["IRQ", 167361111], ["IRL", 422916667], ["ISR", 209722222], ["ITA", 211805556], ["JPN", 585416667], ["JOR", 129861111], ["KAZ", 922222222], ["KEN", 2125], ["KIR", 626388889], ["PRK", 420833333], ["KOR", 834722222], ["KWT", 84722222], ["KGZ", 375694444], ["LAO", 377083333], ["LVA", 709722222], ["LBN", 126388889], ["LSO", 172916667], ["LBR", 544444444], ["LBY", 211805556], ["LTU", 46527778], ["LUX", 419444444], ["MKD", 251388889], ["MDG", 25625], ["MWI", 297222222], ["MYS", 251388889], ["MDV", 88194444], ["MLI", 339583333], ["MLT", 253472222], ["MRT", 295138889], ["MUS", 29375], ["MEX", 209722222], ["FSM", 460416667], ["MDA", 544444444], ["MNG", 54375], ["MNE", 297916667], ["MAR", 125694444], ["MOZ", 336111111], ["NAM", 461805556], ["NPL", 379166667], ["NLD", 379166667], ["NZL", 4625], ["NIC", 464583333], ["NGA", 710416667], ["NOR", 417361111], ["OMN", 128472222], ["PAK", 125694444], ["PAN", 169444444], ["PRY", 377083333], ["PER", 209027778], ["PHL", 129861111], ["POL", 544444444], ["PRT", 3375], ["QAT", 213888889], ["RUS", 86805556], ["LCA", 29375], ["VCT", 86111111], ["WSM", 211111111], ["STP", 125694444], ["SAU", 127777778], ["SEN", 463888889], ["SRB", 422916667], ["SYC", 335416667], ["SLE", 667361111], ["SGP", 297916667], ["SVK", 417361111], ["SVN", 54375], ["SLB", 214583333], ["SOM", 335416667], ["ZAF", 505555556], ["SSD", 250694444], ["ESP", 250694444], ["LKA", 584722222], ["SDN", 378472222], ["SUR", 959722222], ["SWZ", 671527778], ["SWE", 463194444], ["CHE", 460416667], ["SYR", 86111111], ["TJK", 127083333], ["TZA", 379166667], ["THA", 50625], ["TLS", 252777778], ["TGO", 670833333], ["TTO", 50625], ["TUN", 126388889], ["TUR", 293055556], ["TKM", 293055556], ["UKR", 753472222], ["ARE", 88194444], ["GBR", 295833333], ["USA", 546527778], ["URY", 670138889], ["UZB", 294444444], ["VUT", 211111111], ["VEN", 130555556], ["YEM", 380555556], ["ZMB", 460416667], ["ZWE", 792361111], ["AND", 0], ["AIA", 0], ["ABW", 0], ["BMU", 0], ["VGB", 0], ["BDI", 15], ["CYM", 0], ["CHN", 8], ["COL", 7], ["COK", 0], ["CIV", 23], ["CUW", 0], ["DMA", 0], ["GNQ", 22], ["FLK", 0], ["FRO", 0], ["PYF", 0], ["GMB", 10], ["GIB", 0], ["GRL", 0], ["GUM", 0], ["GGY", 0], ["HKG", 0], ["IRN", 4], ["IMN", 0], ["JAM", 2], ["JEY", 0], ["KSV", 0], ["LIE", 0], ["MAC", 0], ["MHL", 0], ["MCO", 0], ["NCL", 0], ["NER", 9], ["NIU", 0], ["MNP", 0], ["PLW", 0], ["PNG", 7], ["PRI", 0], ["ROU", 8], ["RWA", 11], ["KNA", 0], ["MAF", 0], ["SPM", 0], ["SMR", 0], ["SXM", 0], ["TWN", 0], ["TON", 4], ["TUV", 0], ["UGA", 20], ["VNM", 7], ["VGB", 0], ["WBG", 0]]
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
            <Tab label="By Country" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
          {value === 0 && <TabContainer><ChoroplethMap /></TabContainer>}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
          
          
          
      </div>
    );
  }
}

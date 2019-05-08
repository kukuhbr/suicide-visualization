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

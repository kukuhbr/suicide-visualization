import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

class Header extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        return(
            <AppBar position="static" color="secondary">
                <Toolbar>
                <Typography variant="h5" color="inherit" style={{fontFamily: "Tahoma"}}>
                    Suicide Rate Around the World (2016)
                </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
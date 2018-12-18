import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GenreList from '../components/GenreList';
import ProfileTabs from './ProfileTabs'
const styles = theme => ({
    wrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
    },
    aside: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        width: '15%',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        backgroundColor: theme.palette.background.paper,
    },
});

class Profile extends React.Component {
  
    render() {
        const { classes } = this.props;
        // const { isAuthenticated } = this.props.childProps;
        return (
            <React.Fragment>
                < div elevation={6} className={classes.wrapper} >
                    <Paper className={classes.aside}>
                        <GenreList />
                    </Paper>
                    <div>
                        <ProfileTabs
                            logedIn={this.props.childProps.isAuthenticated}
                        />
                    </div>
                </div >
            </React.Fragment>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
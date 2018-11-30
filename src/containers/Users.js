import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { API } from "aws-amplify";
const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        margin: "90px 80px"
        // margin: '0 auto',
    },
    icon: {
        margin: theme.spacing.unit * 2,
        color: 'black'
    },
});

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            drafts: []
        }
    }

async componentDidMount() {
    const { isAuthenticated } = this.props.childProps
    if (!isAuthenticated) {
        return;
    }

    try {
        // const drafts = await this.get();
        console.log(drafts)
        this.setState({ drafts });
    } catch (e) {
        alert(e);
    }

    this.setState({ isLoading: false });
}


    render() {
        const { classes } = this.props;
        // const { isAuthenticated } = this.props.childProps;
        return (
            <Paper className={classes.paper}>

               <p>users</p>
            </Paper>
        );
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
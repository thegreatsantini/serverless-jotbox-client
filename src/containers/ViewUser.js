import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { API } from "aws-amplify";
import VisitingDraftCards from '../components/VisitingDraftCards';
import Loading from '../components/Loading';
import Paper from "@material-ui/core/Paper"
import { Typography } from '@material-ui/core';
const styles = theme => ({
    titleContainer: {
            ...theme.mixins.gutters(),
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            margin: '20px'
    },
    userName : {
        fontSize: 24,
        textAlign: 'center'
    },
    cardsContainer : {
        margin : '20px 30px'
    }
});

class ViewUser extends React.Component {
    state = {
        drafts: [],
        isLoading: true
    };

    getUserData() {
        return API.get('users', `/users/${this.props.match.params.userId}`)
    }

    async componentDidMount() {
            try {
                const drafts = await this.getUserData()
                this.setState({
                    drafts,
                    isLoading: false
                })
            } catch (e) {
                alert(e)
                console.log(e)
            }
    }

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        return (

            <React.Fragment>
                {
                    !isLoading
                        ? <div>
                            <Paper className={classes.titleContainer}>
                            <Typography className={classes.userName} > {this.props.match.params.name}'s Drafts </Typography>
                            </Paper>
                            <Paper className={classes.cardsContainer}>
                            <VisitingDraftCards drafts={this.state.drafts} />
                            </Paper>
                        </div> 
                        : <Loading fontSize={48}/>
                }

            </React.Fragment>
        );
    }
}

ViewUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ViewUser);


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { API } from "aws-amplify";
// import VisitingDraftCards from '../components/VisitingDraftCards';
import Loading from '../components/Loading';
// import Paper from "@material-ui/core/Paper"
// import { Typography } from '@material-ui/core';
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
    }
});

class VisitingDraft extends React.Component {
    state = {
        content: [],
        isLoading: true
    };

    getDraft() {
        return API.get('users', `/users/${this.props.match.params.userId}/draft/${this.props.match.params.draftId}`)
    }

    async componentDidMount() {
            try {
                const drafts = await this.getDraft()
                this.setState({
                    content: drafts,
                    isLoading: false
                })
            } catch (e) {
                alert('This feature isn\'t ready yet')
                this.setState({
                    isLoading: false
                })
                console.log(e)
            }
    }

    render() {
        // const { classes } = this.props;
        const { isLoading } = this.state;
        return (

            <React.Fragment>
                {
                    !isLoading
                        ? <div>
                            <p>View their specific draft here...work in progress</p>
                        </div> 
                        : <Loading />
                }

            </React.Fragment>
        );
    }
}

VisitingDraft.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(VisitingDraft);


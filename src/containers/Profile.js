import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { API } from "aws-amplify";
import GenreList from '../components/GenreList';
import DraftCards from '../components/DraftCards';

const styles = theme => ({
    wrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
    },
    aside: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        width: '25%',
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: theme.palette.background.paper,
    },
    listContainer: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    draftsContainer: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        margin: "90px 20px",
    },

});

class Profile extends React.Component {
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
            const drafts = await this.drafts();
            this.setState({ drafts });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    drafts() {
        return API.get("drafts", "/drafts");
    }

    handleClick = (item) => {
        // console.log(item)
    }



    render() {
        const { classes } = this.props;
        // const { isAuthenticated } = this.props.childProps;
        return (
            <div elevation={6} className={classes.wrapper}>
                <Paper className={classes.aside}>
                    <GenreList genres={['drama', 'history', 'comedy']} />
                </Paper>

                <Paper className={classes.draftsContainer}>
                    <List
                        className={classes.listContainer}
                    >
                        {
                            this.state.drafts.length > 0 &&
                            <DraftCards drafts={this.state.drafts} />
                        }
                    </List>
                </Paper>

            </div >
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
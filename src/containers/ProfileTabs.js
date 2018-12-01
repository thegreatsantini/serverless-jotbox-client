import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import DraftCards from '../components/DraftCards';
import Paper from '@material-ui/core/Paper';
import { API } from "aws-amplify";
import Loading from '../components/Loading'


function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: '95%',
        minWidth: '850px',
        margin: '10px 20px'
    },
});

class ProfileTabs extends React.Component {
    state = {
        value: 'drafts',
        drafts: [],
        isLoading: true,
    };

    async componentDidMount() {
        const { logedIn } = this.props
        if (!logedIn) {
            return;
        }

        try {
            const drafts = await this.drafts();
            this.setState({ drafts });
        } catch (e) {
            alert(e);
        }
        this.setState({ isLoading: false })
    }

    drafts() {
        return API.get("drafts", "/drafts");
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, theme } = this.props;
        const { value, isLoading } = this.state
        return (
            <Paper className={classes.root}>
                {
                    !isLoading
                        ?
                        <React.Fragment>

                            <AppBar position="static" color="default">
                                <Tabs
                                    value={value}
                                    onChange={this.handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    fullWidth
                                >
                                    <Tab value='drafts' label="Drafts" />
                                    <Tab value='following' label="Following" />
                                </Tabs>
                            </AppBar>
                            {value === 'drafts' &&
                                <TabContainer dir={theme.direction}>
                                    <Paper className={classes.draftsContainer}>
                                        <List
                                            className={classes.listContainer}
                                        >
                                            {
                                                this.state.drafts.length > 0
                                                    ? <DraftCards drafts={this.state.drafts} />
                                                    : <Typography
                                                        style={{ textAlign: 'center' }}
                                                        variant='h5'>
                                                        Start writing some drafts
                                                        </Typography>
                                            }
                                        </List>
                                    </Paper>
                                </TabContainer>
                            }
                            {value === 'following' &&
                                <TabContainer dir={theme.direction}>
                                    <Paper className={classes.draftsContainer}>
                                        <List
                                            className={classes.listContainer}
                                        >
                                            <p>following</p>
                                        </List>
                                    </Paper>
                                </TabContainer>
                            }
                        </React.Fragment>
                        : <Loading />
                }
            </Paper>
        );
    }
}

ProfileTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProfileTabs);

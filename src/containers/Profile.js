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
            console.log(drafts)
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
        console.log(item)
    }

    renderDraftCards = (style) => {
        return this.state.drafts.map((item, i) => {
            return (
                <React.Fragment key={i}>

                    <ListItem >
                        {/* <Avatar> */}
                        {/* <EditIcon 
                            component={Link} to='/daft/item' 
                            // onClick={this.handleClick.bind(null, item.draftId)} 
                            /> */}
                        <Icon 
                        component={Link}  
                        to={`/draft/${item.draftId}`} 
                        className={style.icon}
                        >
                        edit
                        </Icon>
                        {/* </Avatar> */}
                        <ListItemText primary={item.prompt} secondary={item.title} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>

            )
        })
    }

    render() {
        const { classes } = this.props;
        // const { isAuthenticated } = this.props.childProps;
        return (
            <Paper className={classes.paper}>

                <List
                    className={classes.root}
                >
                    {this.renderDraftCards(classes)}
                </List>
            </Paper>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
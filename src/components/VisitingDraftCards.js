import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit * 2,
        color: 'black',
    },
});


const VisitingDraftCards = (props) => {
    
        const shortenPrompt = (prompt) => prompt.substring(0, 100) + "..."
        const { classes } = props
        return props.drafts.map((item, i) => {
            return (
                <React.Fragment key={i}>
                    <ListItem >
                        <Icon
                            component={Link}
                            to={`/user/${item.userId}/draft/${item.draftId}`}
                            className={classes.icon}
                        >
                            edit
                    </Icon>
                        <ListItemText primary={item.title} secondary={shortenPrompt(item.prompt)} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            )
        })
    }



export default withStyles(styles)(VisitingDraftCards);
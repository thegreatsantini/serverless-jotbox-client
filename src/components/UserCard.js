import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { Link } from 'react-router-dom';

const styles = theme => ({
    card: {
        minWidth: 75,
        margin: '10px',
        border: 'red solid 1px',
        display: 'flex',
        justifyContent: 'center'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: '50px',
        width: '100%',
        textAlign: 'center',
        maxWidth: 500,
        margin: '0 auto',
        textDecoration: 'underline',
    },
    pos: {
        marginBottom: 12,
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: '10px'
    },
    genresText: {
        textAlign: 'center',
        border: 'red solid 1px'
    },
    userNameText: {
        border: 'blue solid 1px'
    },
    listContainer: {
        display: 'flex',
        justifyContent: 'center',
        border: 'solid green 2px',
    },
    avatar: {
        padding: '10px',
        margin: '20px'
    }
});

function UserCard(props) {
    const { classes, users } = props;
    return (
        <Paper className={classes.root} elevation={1}>
            <Typography
                className={classes.title}
                gutterBottom
                component='h1'
            >
                Browse Users
            </Typography>
            {users.map((item, i) => {
                const checkArray = (genres) => Array.isArray(genres) ? genres.join(", ") : genres
                return (
                    <Card key={i} className={classes.card}>
                        <CardContent>
                            <List className={classes.listContainer}>
                                <div className={classes.avatar}>
                                    <Avatar >
                                        <ImageIcon />
                                    </Avatar>
                                </div>
                                <div>
                                    <ListItem>
                                        <ListItemText className={classes.userNameText} primary={item.name} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText className={classes.genresText} primary={checkArray(item.genres[0])} />
                                    </ListItem>
                                </div>
                            </List>
                        </CardContent>
                        <CardActions>
                            <Button component={Link} to={{ pathname: `/user/${item.name}`, id : `${item.id}`}} size="small">View</Button>
                        </CardActions>
                    </Card>
                )
            })
            }
        </Paper>
    );
}

UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);

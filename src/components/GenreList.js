import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});
class GenreList extends Component {
    state = {
        tags: [],
        toggleAdd: false,
        newTag: ''
    }

    toggleAdd = (e) => {
        e.preventDefault()
        this.setState({ toggleAdd: !this.state.toggleAdd })
    }

    renderTags = () => {
        return this.props.genres.map((item, i) => {
            return (
                <React.Fragment key={i}>
                    <ListItem >
                        <ListItemText primary={item} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            )
        })
    }

    handleAdd = (e) => {
        e.preventDefault()
        const { newTag } = this.state
        this.setState({
            tags: [...this.state.tags, newTag],
            toggleAdd: !this.state.toggleAdd
        })
    }

    handleChange = name => event => {
        this.setState({ newTag: event.target.value })
    }

    renderInput = (classes) => {
        return (

            <ListItem>
                <TextField
                    id="new-tag"
                    label="new tag"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('newTag')}
                    margin="normal"
                />
                <Button
                    onClick={this.handleAdd}
                >
                    add tag
          </Button>
            </ListItem>
        )
    }

    render() {
        const { classes } = this.props


        return (
            <React.Fragment>
                {
                    this.props.genres &&
                    <List className={classes.root}>
                        {
                            this.renderTags()
                        }
                        {
                            !this.state.toggleAdd
                                ? <Button
                                    className={classes.button}
                                    onClick={this.toggleAdd}
                                >
                                    + add tag
                                </Button>
                                : this.renderInput(classes)
                        }
                    </List>
                }
            </React.Fragment>

        );

    }
}

GenreList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenreList);
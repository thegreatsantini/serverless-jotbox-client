import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"
import { API } from "aws-amplify";
import GenreInput from './GenreInput'



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
        genres: [],
        toggleAdd: true,
        newGenre: ''
    }

    toggleAdd = (e) => {
        e.preventDefault()
        this.setState({ toggleAdd: !this.state.toggleAdd })
    }

    renderTags = () => {
        return this.state.genres.map((item, i) => {
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

    async componentDidMount() {
        try {
            const list = await this.getGenres();
            this.setState({ genres: list });

        } catch (e) {
            alert(e);
        }
    }

    getGenres() {
        return API.get("genres", `/genres`);
    }

    handleAdd = (e) => {
        e.preventDefault()
        const { newGenre } = this.state
        this.setState({
            genres: [...this.state.genres, newGenre],
            toggleAdd: !this.state.toggleAdd
        })
    }

    handleChange = name => event => {
        this.setState({ newGenre: event.target.value }, () => console.log(this.state.newGenre))
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                {
                    this.state.genres.length >= 0 &&
                    <List className={classes.root}>
                        {
                            this.renderTags()
                        }
                        {
                            this.state.toggleAdd
                                ? <Button
                                    className={classes.button}
                                    onClick={this.toggleAdd}
                                >
                                    +add genre
                                </Button>
                                :
                                <GenreInput
                                    handleAdd={this.handleAdd}
                                    handleChange={this.handleChange}
                                    value={this.state.newGenre}
                                />
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
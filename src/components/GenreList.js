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
import Loading from "./Loading";



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
        genre: '',
        isLoading: true
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
            const userGenres = list.map(val => val.genre)
            this.setState({ 
                genres: userGenres,
                isLoading: false
            });
        } catch (e) {
            alert(e);
        }
    }

    saveGenre(genre) {
        console.log(genre)
        return API.post('genres', '/genres', {
            body: genre
        })
    }

    getGenres() {
        return API.get("genres", `/genres`);
    }

    handleAdd = async (e) => {
        e.preventDefault()
        const { genre } = this.state
        await this.setState({
            genres: [...this.state.genres, genre],
            toggleAdd: !this.state.toggleAdd,
        })
        try {
            const { genre } = this.state;
            // console.log(this.state.genre)
            await this.saveGenre({ genre });
            this.setState({ genre: '' })
        } catch (e) {
            alert(e)
        }
    }

    handleChange = name => event => {
        this.setState({ genre: event.target.value })
    }

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        return (
            <React.Fragment>
                {
                    !isLoading 
                    ? 
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
                                            value={this.state.genre}
                                        />
                                }
                            </List>
                    
                    : <Loading />
                }
            </React.Fragment>

        );

    }
}

GenreList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenreList);
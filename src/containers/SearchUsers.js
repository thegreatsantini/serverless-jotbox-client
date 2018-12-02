import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { API } from "aws-amplify";
import UserCard from '../components/UserCard'
import SearchForm from '../components/SearchForm';

const styles = theme => ({
    // container: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(genre, that) {
    console.log(that)
    return {
        fontWeight:
            that.state.genre.indexOf(genre) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}


class SearchUsers extends React.Component {
    state = {
        genre: [],
        genreOptions: [],
        isLoading: true,
        users: [],
        filteredUsers: []
    };

    handleSelect = event => {
        // const checkGenre = (person) => person
        // const filterGenres = this.state.users.filter((item, i, arr) => {
        //     console.log(item.genres)
        //     return
        //    item.genre.includes(event.target.value)
        // })
        this.setState({
            genre: event.target.value,
        });
    };

    handleChange = name => event => {
        const filtered = this.state.users.filter(item => {
            const normalizedSearch = event.target.value.replace(/[^A-Za-z0-9]+/gi, '')
            const regex = new RegExp(normalizedSearch, 'i');
            return item.name.match(regex) || false
        });

        this.setState({
            filteredUsers: filtered
        })
    };

    massageData = (users, genres) => {
        const checkGenres = (genres) => genres.length > 0 ? genres : ['N/A']
        const finalData = users.reduce((acc, next) => {
            const currentPerson = {};
            const { userName, userId } = next
            currentPerson.name = userName;
            currentPerson.id = userId;
            currentPerson.genres = genres.filter(item => item.userId === userId).map(val => val.genres);
            currentPerson.genres = checkGenres(currentPerson.genres)
            acc.push(currentPerson);
            return acc
        }, [])
        this.setState({ users: finalData })
    }

    fetchGenres() {
        return API.get('genres', '/genres/list');
    }

    fetchUsers() {
        return API.get('users', '/users')
    }

    async componentDidMount() {
        try {
            const allUsers = await this.fetchUsers();
            const allGenres = await this.fetchGenres();
            const massaged = allGenres.reduce((acc, next) => acc.concat(next.genres), []).filter((val, i, arr) => arr.indexOf(val) === i);
            this.setState({ genreOptions: massaged })
            await this.massageData(allUsers, allGenres)
        } catch (e) {
            alert(e)
        }
        this.setState({ isLoading: false })
    }

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        let usersToDisplay;
        this.state.filteredUsers.length < 1 ? usersToDisplay = this.state.users : usersToDisplay = this.state.filteredUsers;
        return (
            <React.Fragment>
                {
                    !isLoading &&
                    <React.Fragment>
                        <SearchForm
                            genre={this.state.genre}
                            handleChange={this.handleChange}
                            handleSelect={this.handleSelect}
                            genreOptions={this.state.genreOptions} 
                            />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-multiple-genres">Genres</InputLabel>
                            <Select
                                multiple
                                value={this.state.genre}
                                onChange={this.handleSelect}
                                input={<Input id="select-multiple-genres" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                        {selected.map(value => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {this.state.genreOptions.map((item, i) => (
                                    <MenuItem key={i} value={item} style={getStyles(item, this)}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <UserCard users={usersToDisplay} />

                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

SearchUsers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SearchUsers);


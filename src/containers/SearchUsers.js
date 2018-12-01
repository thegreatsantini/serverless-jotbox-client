import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { API } from "aws-amplify";
import UserCard from '../components/UserCard'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
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
    return {
        fontWeight:
            that.state.genre.indexOf(genre) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

class SandBox extends React.Component {
    state = {
        genre: [],
        genreOptions: [],
        isLoading: true,
        users: []
    };

    handleSelect = event => {
        this.setState({ genre: event.target.value });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    massageData = (users, genres) => {
        const finalData = users.reduce((acc, next) => {
            const currentPerson = {};
            currentPerson.name = next.userName;
            currentPerson.id = next.userId;
            currentPerson.genres = genres.filter(item => item.userId === next.userId).map(item => item.genre)
            acc.push(currentPerson);
            return acc
        }, [])
        this.setState({ users: finalData })
    }

    fetchGenres() {
        return API.get('genres', '/genres');
    }

    fetchUsers() {
        return API.get('users', '/users')
    }

    async componentDidMount() {
        try {
            const allUsers = await this.fetchUsers();
            const allGenres = await this.fetchGenres();
            this.setState({ genreOptions: allGenres.map(item => item.genre) })
            await this.massageData(allUsers, allGenres)
        } catch (e) {
            alert(e)
        }
        this.setState({ isLoading: false })
    }

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        return (
            <React.Fragment>
                {
                    !isLoading &&
                    <React.Fragment>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="outlined-search"
                                label="Search Users"
                                type="search"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                fullWidth
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
                        </form>
                        <UserCard users={this.state.users} />
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

SandBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SandBox);


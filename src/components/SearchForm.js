import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

const SearchForm = (props, styles) => {
    const { classes, handleChange } = props
    // console.log(props)
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                onChange={handleChange()}
                id="outlined-search"
                label="Search Users"
                type="search"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
            />
            
        </form>
    )
}


export default withStyles(styles)(SearchForm);
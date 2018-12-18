import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }   
});


const GenreInput = (props) => {
    const { classes, handleAdd, handleChange, value, toggleAdd } = props
    return (
        <React.Fragment>
            <ListItem
                onMouseLeave={toggleAdd.bind(this)}>
                <TextField
                    id="new-tag"
                    label="new tag"
                    className={classes.textField}
                    value={value}
                    onChange={handleChange('newGenre')}
                    margin="normal"
                />
                <Button
                    onClick={handleAdd}
                >
                    add genre
                </Button>
            </ListItem>
        </React.Fragment>
    )
}


export default withStyles(styles)(GenreInput);
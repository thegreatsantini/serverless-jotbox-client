import React from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        paddingTop: "100px",
        textAlign: "center"
    },
});


const NotFound = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <h3>Sorry, page not found!</h3>
        </div>
    )
}

export default withStyles(styles)(NotFound);
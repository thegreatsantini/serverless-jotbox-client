import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

const LoaderButton = (props, { 
    isLoading, 
    disabled = false,
    text,
    loadingText, 
}) => {
    
    const { classes } = props;
    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={props.disabled || props.isLoading}
            onClick={props.onClick}
        >
            {props.isLoading &&<RefreshIcon className={classes.rightIcon} />}
            {!props.isLoading ? props.text : props.loadingText}
        </Button>

    );
}

LoaderButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoaderButton);

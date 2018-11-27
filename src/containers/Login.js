import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Auth } from "aws-amplify";


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        margin: "90px 80px"
        // margin: '0 auto',

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
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

    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },

});

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        };

    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={3}>

                <form className={classes.container} noValidate autoComplete="off">

                    <TextField
                        id="filled-email-input"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                    <TextField
                        id="filled-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    <Button
                        disabled={!this.validateForm()}
                        onClick={this.handleSubmit}
                        variant="contained"
                        className={classes.button}
                    >
                        Login
                </Button>
                </form>
            </Paper>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

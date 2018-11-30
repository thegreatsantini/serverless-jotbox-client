import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Auth } from "aws-amplify";
import LoaderButton from '../components/LoaderButton';
import { Typography } from '@material-ui/core';
import { API } from 'aws-amplify';


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
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '10px'
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
    title: {
        fontSize: '50px',
        width: '100%',
        textAlign: 'center',
        maxWidth: 500,
        margin: '0 auto',
        textDecoration: 'underline',
    },

});

class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            userName: '',
            newUser: null
        };

    }

    validateForm() {
        return this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password
            });
console.log(newUser)
            this.setState({
                newUser
            });
        } catch (e) {
            alert(e.message);
        }

        this.setState({ isLoading: false });
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email, this.state.password);
            const saveUser = await this.saveUser({
                userName: this.state.userName,
                followers: []
            })
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    saveUser(data) {
        return API.post('users', '/users', {
            body: data
        })
    }

    renderForm(classes) {
        return (
            <Paper className={classes.root} elevation={3}>
                <Typography
                    className={classes.title}
                    gutterBottom
                    component='h1'
                >
                    Signup
            </Typography>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="filled-email-input"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        autoComplete="email"
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                    <TextField
                        id="filled-userName-input"
                        label="Username"
                        className={classes.textField}
                        type="text"
                        autoComplete="email"
                        onChange={this.handleChange('userName')}
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
                    <TextField
                        id="filled-confirmPassword-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange('confirmPassword')}
                        margin="normal"
                    />
                    <LoaderButton
                        disabled={!this.validateForm()}
                        isLoading={this.state.isLoading}
                        text="Signup"
                        loadingText="Logging in…"
                        onClick={this.handleSubmit}
                        color='primary'
                    />
                </form>
            </Paper>
        )
    }

    renderConfirmationForm(classes) {
        return (
            <Paper className={classes.root} elevation={5}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        onChange={this.handleChange('confirmationCode')}
                        id="standard-full-width"
                        label="Check your email for confirmation code"
                        style={{ margin: 8 }}
                        placeholder="Input Confermation Code"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <LoaderButton
                        disabled={!this.validateConfirmationForm()}
                        isLoading={this.state.isLoading}
                        text="Verify"
                        type='submit'
                        loadingText="Verifying…"
                        onClick={this.handleConfirmationSubmit}
                        color='primary'
                    />
                </form>
            </Paper>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>

                {
                    this.state.newUser === null
                        ? this.renderForm(classes)
                        : this.renderConfirmationForm(classes)
                }
            </React.Fragment>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);

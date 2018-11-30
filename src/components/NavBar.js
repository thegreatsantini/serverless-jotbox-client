import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom'
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Auth } from "aws-amplify";


const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
});

class NavBar extends React.Component {
    constructor() {
        super()
        this.state = {
            isAuthenticating: false,
            anchorEl: null,
            mobileMoreAnchorEl: null
        };
    }

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleLogout = async event => {
        await Auth.signOut();

        this.props.childProps.userHasAuthenticated(false);

    }

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem component={Link} to='/' onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                {/* ADD FUNCTIONALITY LATER
                <MenuItem>
                    <IconButton color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem> */}
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>
                    <p>Logout</p>
                </MenuItem>
            </Menu>
        );


        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            JotBox
                </Typography>
                        <div className={classes.grow} />
                        {
                            this.props.childProps.isAuthenticated

                                ? <React.Fragment>
                                    <div className={classes.sectionDesktop}>
                                        {/* ADD LATER
                    <IconButton color="inherit">
                    <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                    </Badge>
                </IconButton> */}
                                        <Button
                                            component={Link}
                                            to="/search/users"
                                            color="inherit"
                                        >
                                            Users
                                    </Button>
                                        <Button
                                            component={Link}
                                            to="/draft/new"
                                            color="inherit"
                                        >
                                            New Prompt
                                    </Button>
                                        <IconButton
                                            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                        </IconButton>

                                    </div>
                                    <div className={classes.sectionMobile}>
                                        <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                            <MoreIcon />
                                        </IconButton>
                                    </div>
                                </React.Fragment>
                                : [
                                    <Button
                                        key={0}
                                        component={Link}
                                        to="/signup"
                                        color="inherit"
                                    >
                                        Signup
                                    </Button>,
                                    <Button
                                        key={1}
                                        color="inherit"
                                        component={Link}
                                        to='/login'
                                    >
                                        Login
                                    </Button>
                                ]
                        }

                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
            </div>

        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);

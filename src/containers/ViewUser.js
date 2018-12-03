import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { API } from "aws-amplify";

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

class ViewUser extends React.Component {
    state = {
        
    };

    getUserId() {
        return API.get('users', `/users/${this.props.location.id}`)
    }

    async componentDidMount() {
        // console.log(this.)
        try {
            const test = await this.getUserId()
            console.log(test)
        } catch(e) {
            console.log(e)
        }
    }

    render() {
        const { classes } = this.props;
        const { isLoading } = this.state;
        return (
            <React.Fragment>
                <h3>View User</h3>
            </React.Fragment>
        );
    }
}

ViewUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ViewUser);


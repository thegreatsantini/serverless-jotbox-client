import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextEditor from './TextEditor'
import { Link } from 'react-router-dom';
import { API } from "aws-amplify";
const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        margin: "90px 80px"
        // margin: '0 auto',
    },
    icon: {
        margin: theme.spacing.unit * 2,
        color: 'black'
    },
});

class Draft extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            isDeleting: null,
            draft: {},
            notes: {},
            prompt: "",
            title: ""
        }
    }

    async componentDidMount() {
        try {

            const note = await this.getDraft();
            const { draft, prompt, title, notes } = note;

            this.setState({
                draft,
                prompt,
                title,
                notes,
                isLoading: false
            });
            
        } catch (e) {
            alert(e);
        }
    }

    getDraft() {
        return API.get("drafts", `/drafts/${this.props.match.params.id}`);
    }


    render() {
        const { classes } = this.props;
        // const { isAuthenticated } = this.props.childProps;
        return (
            <div>
            {
                !this.state.isLoading 
                ?
                <React.Fragment>
                    <p>{this.state.title}</p>
                <TextEditor
                    content={this.state.draft}
                />
                <TextEditor
                    content={this.state.notes}
                />
            </React.Fragment>
            :<p>hello</p>
            } 
            
            </div>
        );
    }
}

Draft.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Draft);
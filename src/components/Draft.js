import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextEditor from './TextEditor'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import LoaderButton from '../components/LoaderButton'

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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
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

    onEdit = (editor, editorState) => {
        this.setState({
            [editor]: editorState
        });
    }

    handleChange = name => event => {
        
        this.setState({
            [name]: event.target.value,
        });
    };

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

    handleSubmit = async event => {
        event.preventDefault();


        this.setState({ isLoading: true });

        try {

            await this.saveDraft({
                notes: this.state.notes,
                title: this.state.title,
                draft: this.state.draft,
                prompt: this.state.prompt
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    saveDraft(draft) {
        return API.put("drafts", `/drafts/${this.props.match.params.id}`, {
            body: draft
        });
    }

    renderDraft = (classes) => {
        return (
            <React.Fragment>
                <TextField
                    id="outlined-full-width"
                    label="Title"
                    value={this.state.title}
                    style={{ margin: '15px 0' }}
                    // placeholder="Placeholder"
                    fullWidth={true}
                    onChange={this.handleChange('title')}
                    margin="dense"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-full-width"
                    label="Edit Prompt"
                    value={this.state.prompt}
                    style={{ margin: '15px 0' }}
                    // placeholder="Placeholder"
                    fullWidth={true}
                    onChange={this.handleChange('prompt')}
                    margin="dense"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <div className={classes.container} >

                    <TextEditor
                        onEdit={this.onEdit}
                        editor='draft'
                        content={this.state.draft}
                    />
                    <TextEditor
                        onEdit={this.onEdit}
                        editor='notes'
                        content={this.state.notes}
                    />
                </div>
                <div className={classes.container}>
                    <LoaderButton
                        // disabled={!this.validateForm()}
                        isLoading={this.state.isLoading}
                        text="Update Draft"
                        loadingText="Updating Draft…"
                        onClick={this.handleSubmit}
                    />
                    <LoaderButton
                        // disabled={!this.validateForm()}
                        isLoading={this.state.isLoading}
                        text="Delete Draft"
                        loadingText="Delting Draft…"
                        onClick={this.handleSubmit}
                    />
                </div>
            </React.Fragment>
        )
    }

    render() {
        const { classes } = this.props;
        // const { isAuthenticated } = this.props.childProps;
        return (
            <div>
                {
                    !this.state.isLoading
                        ? this.renderDraft(classes)
                        : <p>Fetching Draft</p>
                }
            </div>
        );
    }
}

Draft.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Draft);
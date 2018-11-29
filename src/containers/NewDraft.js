import React, { Component } from 'react';
import TextEditor from '../components/TextEditor'
import NewPrompt from '../components/NewPrompt';
import LoaderButton from '../components/LoaderButton'
import TextField from '@material-ui/core/TextField';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { API } from "aws-amplify";
import config from '../config'
const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
}

export default class NewDraft extends Component {
    constructor() {
        super()
        this.state = {
            prompt: '',
            title: '',
            draft: {},
            notes: {}
        }
    }
    onEdit = (editor, editorState) => {
        this.setState({
            [editor]: editorState
        });
    }

    setPrompt = (prompt) => {
        const newPrompt =  prompt.reduce((acc, next) => {
            acc += next.text + " "
            return acc
        }, '').trim()
        this.setState({ prompt: newPrompt })
    }

    validateForm() {
        return this.state.title.length > 0;
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
            const req = await this.createNote({
                notes: this.state.notes,
                title: this.state.title,
                draft: this.state.draft,
                prompt: this.state.prompt
            });
            console.log(req)
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createNote(content) {
        return API.post("drafts", "/drafts", {
            body: content
        });
    }

    render() {
        return (
            <div>
                <NewPrompt setPrompt={this.setPrompt} />
                <br />
                <TextField
                    id="outlined-full-width"
                    label="Title"
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
                <div style={styles.container} >
                    <TextEditor editor='draft' onEdit={this.onEdit} placeholder="Tell a Story..." />
                    <TextEditor editor='notes' onEdit={this.onEdit} placeholder="Take Notes" />
                </div>
                <LoaderButton
                    disabled={!this.validateForm()}
                    isLoading={this.state.isLoading}
                    text="Save Draft"
                    loadingText="Saving Draft…"
                    onClick={this.handleSubmit}
                    color='primary' />
            </div>
        );
    }
}
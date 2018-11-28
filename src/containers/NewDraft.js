import React, { Component } from 'react';
import TextEditor from '../components/TextEditor'
import NewPrompt from '../components/NewPrompt';
import LoaderButton from '../components/LoaderButton'
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
        const title = prompt.reduce((acc, next) => {
            acc += next.text + " "
            return acc
        }, '').trim()
        this.setState({ title })
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
                draft: this.state.draft
            });
            console.log(req)
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    createNote(content) {
        return API.post("drafts", "/drafts", {
            body: content
        });
    }

    render() {
        return (
            <div>
                <NewPrompt setPrompt={this.setPrompt} />
                <div style={styles.container} >
                    <TextEditor editor='draft' onEdit={this.onEdit} placeholder="Tell a Story..." />
                    <TextEditor editor='notes' onEdit={this.onEdit} placeholder="Take Notes" />
                </div>
                <LoaderButton
                    disabled={!this.validateForm()}
                    isLoading={this.state.isLoading}
                    text="Save Draft"
                    loadingText="Saving Draft…"
                    onClick={this.handleSubmit} />
            </div>
        );
    }
}
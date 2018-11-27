import React, { Component } from 'react';
import TextEditor from '../components/TextEditor'
import NewPrompt from '../components/NewPrompt';

const styles = {
    container : { 
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
            draft: '',
            note: ''
        }
    }
    onEdit = (editor, editorState) => {
        this.setState({
            [editor]: editorState
        });
    }

    setPrompt = (prompt) => { 
        const title = prompt.reduce((acc, next) => {
            acc+= next.text + " "
            return acc
        }, '').trim()
        this.setState({ title })
     }

    render() {
        return (
            <div>
                <NewPrompt setPrompt={this.setPrompt}/>
                <div style={styles.container} >
                    <TextEditor editor='draft' onEdit={this.onEdit} placeholder="Tell a Story..." />
                    <TextEditor editor='note' onEdit={this.onEdit} placeholder="Take Notes" />
                </div>
            </div>
        );
    }
}
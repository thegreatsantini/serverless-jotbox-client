import React, { Component } from 'react';
import TextEditor from '../components/TextEditor'

export default class NewDraft extends Component {
    constructor() {
        super()
        this.state = {

        }
    }   

    render() {
        return (
            <div>
                <div >
                    <TextEditor />
                </div>
            </div>
        );
    }
}
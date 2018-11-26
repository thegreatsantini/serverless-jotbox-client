import React, { Component } from "react";

const styles = {
    lander: {
        padding: '80px 0',
        textAlign: 'center',
    },
        h1: {
            fontFamily: "Open Sans, sans-serif",
            fontWeight: "600"
        }, 
        p: {
            color: "#999"
        }
}

export default class Home extends Component {
    render() {
        return (
            <div style={styles.lander}>
                <div>
                    <h1 style={styles.h1} >JotBox</h1>
                    <p style={styles.p}>Help with writers block, share your work</p>
                </div>
            </div>
        );
    }
}
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
    root: {
        marginTop: '5px',
        marginBottom: '5px',
        // paddingTop: "50px",
        textAlign: "center",
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    promptContainer: {
        display: "flex",
        justifyContent: 'space-around'
    },
    paper: {
        margin: theme.spacing.unit,
    },
    prompt: {
        textAlign: 'center'
    }
});


class NewPrompt extends React.Component {
    constructor() {
        super()
        this.state = {
            prompt: []
        }
    }

    renderPrompt = (classes) => {
        const prompt = this.state.prompt.map(val => val.text).join(' ')
        // console.log(prompt)
        return (
            <div className={classes.promptContainer}>
                <Fade in={true} timeout={2000} >
                   <Typography component='h3' className={classes.prompt}>
                   <h3>{prompt}</h3>
                       </Typography> 
                </Fade>
                <Button onClick={this.fetchPrompt} variant="contained" size='small' color="secondary" className={classes.button}>
                    Next
                </Button>
               
            </div>
        )
    }

    fetchPrompt = async () => {
        const promptArr = []
        const data = await fetch('https://ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location')

        data.json()
            .then(prompt => {
                promptArr.push({ text: prompt.components[0].english, fadeTime: Math.floor(Math.random() * 5000) + 500 })
                promptArr.push({ text: prompt.components[1].words[0].text, fadeTime: Math.floor(Math.random() * 5000) + 500 })
                promptArr.push({ text: prompt.components[1].words[1].text, fadeTime: Math.floor(Math.random() * 5000) + 500 })
                promptArr.push({ text: prompt.components[2].english, fadeTime: Math.floor(Math.random() * 5000) + 500 })
                promptArr.push({ text: prompt.components[3].english, fadeTime: Math.floor(Math.random() * 5000) + 500 })
                // this.props.setPrompt(promptArr)
                return promptArr
            })
            .then(res => this.setState({ prompt: res }))

    }

    renderButton(classNames) {
        return (
            <Button onClick={this.fetchPrompt} variant="contained" color="secondary" className={classNames.button}>
                New Prompt
            </Button>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                {
                    this.state.prompt.length < 1
                        ? this.renderButton(classes)
                        : this.renderPrompt(classes)
                }
            </Paper>
        )
    }
}

NewPrompt.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPrompt);
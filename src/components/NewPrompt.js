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
        border: '2px solid white'
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
    }
});


class NewPrompt extends React.Component {
    constructor() {
        super()
        this.state = {
            prompt: []
        }
    }

    renderPrompt = () => {
        return this.state.prompt.map((item, i) => {
            return (
                <Fade in={true} key={i} timeout={item.fadeTime}>
                    {/* <Typography component="h3"> */}
                    <h3>{item.text}</h3>
                    {/* </Typography> */}
                </Fade>
            )
        })
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
                this.props.setPrompt(promptArr)
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
                        : <div className={classes.promptContainer}>
                            {this.renderPrompt()}
                            <Button onClick={this.fetchPrompt} variant="contained" size='small' color="secondary" className={classes.button}>
                                Next
                            </Button>
                        </div>
                }
            </Paper>
        )
    }
}

NewPrompt.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPrompt);
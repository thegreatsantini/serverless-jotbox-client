import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"

const myTags = ['adventure', 'romance', 'comedy', 'mystery', 'noir']

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid black'
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});
class SandBox extends Component {
  state = {
    tags: [],
    toggleAdd: false,
    newTag: ''
  }

  toggleAdd = (e) => {
    e.preventDefault()
    this.setState({ toggleAdd: !this.state.toggleAdd })
  }

  renderTags = () => {
    return this.state.tags.map((item, i) => {
      return (
        <React.Fragment key={i}>
          <ListItem >
            <ListItemText primary={item} />
          </ListItem>
          <Divider />
        </React.Fragment>
      )
    })
  }

  handleAdd = (e) => {
    e.preventDefault()
    const { newTag } = this.state
    // console.log(this.state.tags)
    this.setState({
      tags : [...this.state.tags, newTag],
      toggleAdd: !this.state.toggleAdd
    })
  }

  componentDidMount = () => {
    this.setState({ tags: myTags })
  }

  handleChange = name => event => {
    this.setState({ newTag: event.target.value })
  }

  renderInput = (classes) => {
    return (

      <ListItem>
        <TextField
          id="new-tag"
          label="new tag"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('newTag')}
          margin="normal"
        />
        <Button
          onClick={this.handleAdd}
        >
          add tag
          </Button>
      </ListItem>
    )
  }

  render() {
    const { classes } = this.props
    if (this.state.tags.length > 1) {

      return (
        <React.Fragment>

          <List className={classes.root}>
            {
              this.renderTags()
            }
            {
              !this.state.toggleAdd
                ? <Button
                  className={classes.button}
                  onClick={this.toggleAdd}
                >
                  + add tag
              </Button>
                : this.renderInput(classes)
            }
          </List>
        </React.Fragment>

      );
    } else {
      return (
        <p>fetching</p>
      )
    }
  }
}

SandBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SandBox);
import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import { API } from "aws-amplify";
import GenreInput from "./GenreInput";
import Loading from "./Loading";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  icon: {
    fontSize: 24,
  },
  genreText: {
  }
});

class Tags extends Component {
  render() {
    return (
      <React.Fragment>
        <ListItem>
          <ListItemIcon />
          <ListItemText
            className={this.props.style.genreText}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
            primary={this.props.item}
          />
          <DeleteIcon
            className={this.props.style.icon}
            style={{ display: this.props.isHovering }}
            onClick={this.props.handleRemove}
          />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  }
}

class GenreList extends Component {
  state = {
    genres: [],
    toggleAdd: true,
    genre: "",
    isLoading: true,
    isHovered: {}
  };

  toggleAdd = e => {
    e.preventDefault();
    this.setState({ toggleAdd: !this.state.toggleAdd });
  };

  handleMouseEnter = index => {
    this.setState(prevState => {
      return { isHovered: { ...prevState.isHovered, [index]: true } };
    });
  };

  handleMouseLeave = index => {
    this.setState(prevState => {
      return { isHovered: { ...prevState.isHovered, [index]: "none" } };
    });
  };

  renderTags = classes => {
    const { isHovered } = this.state;
    return this.state.genres.map((item, i) => {
      return (
        <React.Fragment key={i}>
          <Tags
            item={item}
            style={classes}
            onMouseEnter={() => this.handleMouseEnter(i)}
            onMouseLeave={() => this.handleMouseLeave(i)}
            isHovering={isHovered[i]}
            handleRemove={this.handleRemove.bind(null, i)}
          />
        </React.Fragment>
      );
    });
  };

  async componentDidMount() {
    try {
      const list = await this.getGenres();
      const isHovered = list[0].genres.reduce((acc, next, i) => {
        if (!acc.hasOwnProperty(i)) {
          acc[i] = "none";
        }
        return acc;
      }, {});
      this.setState({
        genres: list[0].genres || [],
        isLoading: false,
        isHovered
      });
    } catch (e) {
      this.setState({
        genres: [],
        isLoading: false
      });
    }
  }
handleRemove = (index) => {
    this.setState({
        genres: this.state.genres.filter( (val, i)=> i !== index )
    },()=> {
        const {genres} = this.state
        this.saveGenre({genres})
    })
}
  saveGenre(genres) {
    return API.post("genres", "/genres", {
      body: genres
    });
  }

  getGenres() {
    return API.get("genres", `/genres`);
  }

  handleAdd = async e => {
    e.preventDefault();
    const { genre } = this.state;
    await this.setState({
      genres: [...this.state.genres, genre],
      toggleAdd: !this.state.toggleAdd
    });
    try {
      const {genres} = this.state;
      await this.saveGenre({ genres });
      this.setState({ genre: "" });
    } catch (e) {
      alert(e);
    }
  };

  handleChange = name => event => {
    this.setState({ genre: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        {!isLoading ? (
          <React.Fragment>
            <Typography>My Genres</Typography>
            <List className={classes.root}>
              {this.renderTags(classes)}
              {this.state.toggleAdd ? (
                <Button 
                className={classes.button} 
                onMouseEnter={this.toggleAdd}
                >
                  +add genre
                </Button>
              ) : (
                  <GenreInput
                  handleAdd={this.handleAdd}
                  handleChange={this.handleChange}
                  toggleAdd={this.toggleAdd}
                  value={this.state.genre}
                />
              )}
            </List>
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </React.Fragment>
    );
  }
}

GenreList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenreList);

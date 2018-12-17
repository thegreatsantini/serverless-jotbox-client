import React, { Component } from "react";
import Profile from "./Profile";
const styles = {
  conatainer: {
    //   width: "10vw",
    //   height: "100",
    backgroundImage:
      'url("https://www.timelinecoverbanner.com/facebook-covers/writer-cover.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "right top",
    backgroundRepeat: "no-repeat"
  },
  lander: {
    height: "85vh",
    margin: 0,
    padding: "80px 0",
    textAlign: "center"
  },
  h1: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "600",
    fontSize: '132px'
  },
  p: {
      fontSize: 24,
    color: "#999"
  }
};

export default class Home extends Component {
  renderLander = () => {
    return (
      <div style={styles.conatainer}>
        <div style={styles.lander}>
          <div>
            <h1 style={styles.h1}>JotBox</h1>
            <p style={styles.p}>Help with writers block, share your work</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <React.Fragment>
        {!isAuthenticated ? (
          this.renderLander()
        ) : (
          <Profile childProps={this.props} />
        )}
      </React.Fragment>
    );
  }
}

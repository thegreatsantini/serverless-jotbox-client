import React, { Component } from 'react';
import NavBar from "./components/NavBar";
import Routes from './Routes'

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    console.log('set user')
    this.setState({ isAuthenticated: authenticated });
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <React.Fragment>
        <NavBar childProps={childProps} />
        <Routes childProps={childProps} />
      </React.Fragment>
    );
  }
}

export default App;

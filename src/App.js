import React, { Component } from 'react';
import { Auth } from "aws-amplify";
import NavBar from "./components/NavBar";
import Routes from './Routes'

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
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
      !this.state.isAuthenticating &&
      <React.Fragment>
        <NavBar childProps={childProps} />
        <Routes childProps={childProps} />
      </React.Fragment>
    );
  }
}

export default App;

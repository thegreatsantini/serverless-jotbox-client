import React, { Component } from 'react';
import { Auth } from "aws-amplify";
import NavBar from "./components/NavBar";
import Routes from './Routes'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      userName: null
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      // console.log('current Session', test)
      await Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({userName: user.username})
        // Auth.userAttributes(user)
        this.userHasAuthenticated(true);
      })
      // .then(attributes => console.log('hello', attributes))
        .catch(err => console.log('APP.JS current user', err));
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  render() {
    const childProps = {
      userName: this.state.userName,
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

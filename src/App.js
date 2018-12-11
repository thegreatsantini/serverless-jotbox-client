import React, { Component } from 'react';
import { Auth } from "aws-amplify";
import NavBar from "./components/NavBar";
import Routes from './Routes';
import { API } from 'aws-amplify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  // getUserName = () =>{
  //   return API.get('users', '/user')

  // }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      // Auth.currentAuthenticatedUser()
      //   .then(user => Auth.userAttributes(user))
      //   .then(attributes => console.log(attributes))
      //   .catch(err => console.log(err));
      // console.log(test)
      this.userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = async authenticated => {

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
import React, { Component } from 'react';
import NavBar from "./components/NavBar";
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;

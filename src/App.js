import React, { Component } from 'react';
import NavBar from "./components/NavBar";
import Home from './containers/Home'

class App extends Component {
  render() {
    return (
      <div>

      <NavBar />
      <Home />
      </div>
    );
  }
}

export default App;

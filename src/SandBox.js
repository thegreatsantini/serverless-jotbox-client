import React, { Component } from 'react';
import { API } from 'aws-amplify';
export default class SandBox extends Component {
  state = {
    userName: 'thegreatsantini',
    followers: []
  }

  handleTest = async (e) => {
    e.preventDefault()

    try {
      const req = await this.saveUser({
        userName: this.state.userName,
        followers: this.state.followers
      })
      console.log(req)
    } catch (e) {
      console.log(e)
    }
  }

  saveUser(data) {
    return API.post('users', '/users', {
      body: data
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleTest} >test</button>

      </div>
    );
  }
}
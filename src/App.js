import React, { Component } from 'react';

import './App.css';

class App extends Component {
  //allows for creating state, binding functions
  constructor(props) {
    super(props);

    //state always hold app data in object. This is initial state
    this.state = {
      id: '',
      name: '',
      answers: {
        q1: '',
        q2: '',
        q3: '',
        q4: ''
      },
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const name = this.refs.name.value;

    event.preventDefault();     //prevent page refresh after submit
    this.setState({
      name: name
    })
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false) {
      user = <h2>Welcome {this.state.name}</h2>
    } else if(!this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder='Enter Name...' ref='name'/>
        </form>
      </span>
      questions = '';
    } else if(this.state.submitted === true) {

    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to SimpleSurvey</h2>
        </div>
        <div className="main">
          {user}
        </div>
      </div>
    );
  }
}

export default App;

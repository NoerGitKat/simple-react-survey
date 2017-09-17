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
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleSubmit(event) {
    const name = this.refs.name.value;

    event.preventDefault();     //prevent page refresh after submit
    this.setState({
      name: name
    })
  }

  handleQuestionSubmit(event) {
    event.preventDefault();   //prevent page refresh after submit

  }

  handleQuestionChange(event) {
    let answers = this.state.answers;
    if(event.target.name === 'q1') {
      answers.q1 = event.target.value;
    } else if(event.target.name === 'q2') {
      answers.q2 = event.target.value
    } else if(event.target.name === 'q3') {
      answers.q3 = event.target.value
    } else if(event.target.name === 'q4') {
      answers.q4 = event.target.value
    }
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false) {
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQuestionSubmit}>
          <label htmlFor="">What is your favorite sci-fi book?</label>
          <br/>
          <br/>
          <input type="radio" name='q1' value='Stranger in a Strangeland' onChange={this.handleQuestionChange}/> Stranger in a Strangeland
          <input type="radio" name='q1' value='Foundation' onChange={this.handleQuestionChange}/> Foundation
          <input type="radio" name='q1' value='Brave New World' onChange={this.handleQuestionChange}/> Brave New World
          <br/>
          <br/>
          <br/>
          <label htmlFor="">What is your political view?</label>
          <br/>
          <br/>
          <input type="radio" name='q2' value='Libertarian' onChange={this.handleQuestionChange}/> Libertarian
          <input type="radio" name='q2' value='Liberal' onChange={this.handleQuestionChange}/> Liberal
          <input type="radio" name='q2' value='Conservative' onChange={this.handleQuestionChange}/> Conservative
          <br/>
          <br/>
          <br/>
          <label htmlFor="">What is your ideal weekday?</label>
          <br/>
          <br/>
          <input type="radio" name='q3' value='Work hard, play hard' onChange={this.handleQuestionChange}/> Work hard, play hard
          <input type="radio" name='q3' value='Doing nothing all day' onChange={this.handleQuestionChange}/> Doing nothing all day
          <input type="radio" name='q3' value='Slave away and watch tv' onChange={this.handleQuestionChange}/> Slave away and watch tv
          <br/>
          <br/>
          <br/>
          <label htmlFor="">What is your age?</label>
          <br/>
          <br/>
          <input type="radio" name='q4' value='20 - 35' onChange={this.handleQuestionChange}/> 20 - 35
          <input type="radio" name='q4' value='36 - 54' onChange={this.handleQuestionChange}/> 36 - 54
          <input type="radio" name='q4' value='55 - 99' onChange={this.handleQuestionChange}/> 55 - 99
        </form>
      </span>
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
          {questions}
        </div>
      </div>
    );
  }
}

export default App;

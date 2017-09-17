import React, { Component } from 'react';

import './App.css';

import uuid from 'uuid';          //to generate random id number
import firebase from 'firebase';  //to make state persistent externally

//allows for connection with Firebase service
var config = {
        apiKey: "AIzaSyC13J3WBhGVoLNibPYR-Ic-xNLh3gYQe7I",
        authDomain: "simplesurvey-2f490.firebaseapp.com",
        databaseURL: "https://simplesurvey-2f490.firebaseio.com",
        projectId: "simplesurvey-2f490",
        storageBucket: "simplesurvey-2f490.appspot.com",
        messagingSenderId: "384989471257"
      };
      firebase.initializeApp(config);

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

    //bind the keyword this so methods can refer to this component instead of local scope of function
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleQuestionsSubmit = this.handleQuestionsSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  //updates state with new id and name
  handleNameSubmit(event) {
    const name = this.refs.name.value;

    this.setState({
      id: uuid.v1(),
      name: name
    })

    event.preventDefault();     //prevent page refresh after submit
  }

  //connects to database to save state and make it persistent
  handleQuestionsSubmit(event) {
    console.log('Questions submitting...');
    firebase.database().ref(`surveys/${this.state.id}`).set({
      name: this.state.name,
      answers: this.state.answers
    })

    this.setState({
      submitted: true
    }, () => {
      console.log('Questions submitted!');
    })
    event.preventDefault();   //prevent page refresh after submit

  }

  //change state after every input change
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
    //initialize variables
    var user;
    var questions;

    //control statements to show different content depending on state
    if(this.state.name && this.state.submitted === false) {
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQuestionsSubmit}>
          <label htmlFor="">What is your favorite sci-fi book?</label>
            <input className='input' type="radio" name='q1' value='Stranger in a Strangeland' onChange={this.handleQuestionChange}/> Stranger in a Strangeland
            <input className='input' type="radio" name='q1' value='Foundation' onChange={this.handleQuestionChange}/> Foundation
            <input className='input' type="radio" name='q1' value='Brave New World' onChange={this.handleQuestionChange}/> Brave New World
          <label htmlFor="">What is your political view?</label>
            <input className='input' type="radio" name='q2' value='Libertarian' onChange={this.handleQuestionChange}/> Libertarian
            <input className='input' type="radio" name='q2' value='Liberal' onChange={this.handleQuestionChange}/> Liberal
            <input className='input' type="radio" name='q2' value='Conservative' onChange={this.handleQuestionChange}/> Conservative
          <label htmlFor="">What is your ideal weekday?</label>
            <input className='input' type="radio" name='q3' value='Work hard, play hard' onChange={this.handleQuestionChange}/> Work hard, play hard
            <input className='input' type="radio" name='q3' value='Doing nothing all day' onChange={this.handleQuestionChange}/> Doing nothing all day
            <input className='input' type="radio" name='q3' value='Slave away and watch tv' onChange={this.handleQuestionChange}/> Slave away and watch tv
          <label htmlFor="">What is your age?</label>
            <input className='input' type="radio" name='q4' value='20 - 35' onChange={this.handleQuestionChange}/> 20 - 35
            <input className='input' type="radio" name='q4' value='36 - 54' onChange={this.handleQuestionChange}/> 36 - 54
            <input className='input' type="radio" name='q4' value='55 - 99' onChange={this.handleQuestionChange}/> 55 - 99
          <button className='btn'>Submit Questions!</button>
        </form>
      </span>
    } else if(!this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit}>
          <input type="text" placeholder='Enter Name...' ref='name'/>
        </form>
      </span>
      questions = '';
    } else if(this.state.submitted === true) {
      user =  <div>
                <h1>Your answers are submitted, {this.state.name}!</h1>
                <p>Thank you for your participation.</p>
              </div>
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

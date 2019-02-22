import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './Quiz.jsx';
import Popup from './Popup.jsx';
import Header from './Header.jsx';
import './index.css';

class Index extends React.Component {       // React commponment called index
  constructor() {                           // can only have state inside the constructor
    super()                                 // need super with our construktor
    this.state = {                          // our state
      results: [],                             // data from API
      correctAnswered: 0,
      totalCorrectAnswered: 0,                   
      incorrectAnswer: 0,
      validateAnswers: false,               // checks if we should validate questions
      showPopup: false,                  
      gamePlayed: 0,    
      currentPage: "quiz",
      showMenu: false,                      
    }
    this.correctAnswered = this.correctAnswered.bind(this)                  // binds function so "this" points to the commponment
    this.incorrectAnswer = this.incorrectAnswer.bind(this)
    this.validateAnswers = this.validateAnswers.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.apiCall = this.apiCall.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.calculatePercentage = this.calculatePercentage.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  apiCall() {                                                                                   // fetches data from API and sets it onto the state
    fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")        
      .then(res => res.json())
      .then(({ results }) => this.setState({ results })

      )
    this.setState({ validateAnswers: false, showPopup: false, correctAnswered: 0 });
    window.scrollTo(0, 0)
  }
  correctAnswered() {                                           
    setTimeout(
      function () {
        this.setState({ correctAnswered: this.state.correctAnswered + 1, totalCorrectAnswered: this.state.totalCorrectAnswered + 1 })                      // updates the state with the current number of correct answerd questions +1
      }
        .bind(this),      // binds this to functions function
      0
    );
  }
  incorrectAnswer() {
    setTimeout(
      function () {
        this.setState({ incorrectAnswer: this.state.incorrectAnswer + 1 })                      // updates the state with the current number of incorrect answerd questions +1
      }
        .bind(this),        // binds this to functions function
      0
    );
  }
  validateAnswers() {
    this.setState({ validateAnswers: true, showPopup: true, gamePlayed: this.state.gamePlayed + 1 })    // when called updates state on validateanswers = true. and so on...
  }
  closePopup() {
    this.setState({ showPopup: false })         
  }
  setCurrentPage(page) {
    this.setState({ currentPage: page })                  // we recive the value of current page and sets it onto the state.
  }
  calculatePercentage() {
    const total = this.state.incorrectAnswer + this.state.correctAnswered;
    return total ? Math.floor(this.state.totalCorrectAnswered / total * 100) : 0                    
  }
  showMenu() {
    this.setState({ showMenu: !this.state.showMenu })     // setes the state of show menú to the opposite of it's current value
  }
  render() {                // everything inside will rerender everytime theres a state change

    return (      // returns html
      <div className={`container ${this.state.showMenu ? 'grey-background' : ''}`}>    {/* if show menu is true add class = grey-background*/}
        <Header setCurrentPage={this.setCurrentPage} showMenuFunc={this.showMenu} showMenu={this.state.showMenu} />   {/*  renders component header and passes props */}
        <div className={`quiz ${this.state.currentPage === "quiz" ? '' : 'hidden'}`}>   {/* if show menu is true add class = hidden*/}
          {this.state.showPopup && <Popup correctAnswer={this.state.correctAnswered} closePopup={this.closePopup} apiCall={this.apiCall} />}  {/*  renders component popup and passes props */}
          {/* render quiz if results are not empty  */}{this.state.results.length > 0 &&        
            <div>   
              <h4>Quiz {this.state.gamePlayed + 1}</h4>       {/* render current games played +1  */}
              {/* loops through results and renders quiz component and passes porops */}{this.state.results.map((results, index) => <Quiz 
                key={results.question}              
                index={index + 1}
                {...results}
                correctAnswered={this.correctAnswered}
                incorrectAnswer={this.incorrectAnswer}
                validateAnswers={this.state.validateAnswers}
              />)}
            </div>}
          <button className={this.state.results.length > 0 ? 'submitbtn' : 'quizbtn'} onClick={this.state.results.length > 0 ? this.validateAnswers : this.apiCall}>{this.state.results.length > 0 ? 'submit' : 'Start Quiz'}</button>
        </div>    {/* checks if results are empty and changes the state of the button accordingly */}
        <div className={`lorem ${this.state.currentPage === "stats" ? '' : 'hidden'}`}> {/* if show menu is true add class = hidden*/}
          <h2>Stats</h2>
          <p>Games played : {this.state.gamePlayed} </p>
          <p>Correct answers : {this.state.totalCorrectAnswered} </p>
          <p>Incorrect answer : {this.state.incorrectAnswer} </p>
          <p>Correct percentage : {this.calculatePercentage()}% </p>
        </div>
        <div className={`lorem ${this.state.currentPage === "about" ? '' : 'hidden'}`}>   {/* if show menu is true add class = hidden*/}
          <h2>About</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci debitis quas fugiat at quibusdam veniam, nisi, dignissimos consectetur quis error ad blanditiis amet quisquam nobis voluptas, dolor sunt labore ut reprehenderit. Explicabo nulla impedit deleniti iure, at non perferendis libero minima voluptas pariatur cumque mollitia laboriosam porro optio, consequuntur beatae.
          </p>
        </div>

      </div >
    )
  }
}

ReactDOM.render(<Index />, document.getElementById("root"))       //renders the index component inside the elemnt with teh id root
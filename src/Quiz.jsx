import React from 'react';
import _ from 'lodash';


export default class Quiz extends React.Component {     
    constructor(props) {                    // create constructor to the definde state
        super(props);                       // need to have in the constructor
        this.state = {                      // this is our state
            answers: undefined,             // an state. sets the current answer on the state
            validated: false                // checks if the answer has allready been validated
        };
        props.incorrect_answers.push(props.correct_answer);     // pushed the correct answer to the inccorect array
        this.answers = _.shuffle(props.incorrect_answers);      // shuffelse the array

    }
    componentDidUpdate() {                  // this fucntion runs everytime there is a change in the state or the prop
        if (this.props.validateAnswers && !this.state.validated) {  // if validate answer is true and hanst allready been validated
            this.setState({ validated: true })          // sets calidated to true

            if (this.state.answers === this.props.correct_answer) {     // if the answer is correct incroment current answer
                this.props.correctAnswered();
            } else {
                this.props.incorrectAnswer();           // if answers is not true incroment answer
            }
        } if (!this.props.validateAnswers && this.state.validated) {
            this.setState({ validated: false, answers: undefined })
        }
    }

    setAnswer(results) {
        this.setState({ answers: results })             // updates teh state with the current answer 
    }
    render() {
        let question = this.props.question;
        question = question.replace(new RegExp(/&quot;/, 'g'), '"');    // string manipulation. replaces charachters in the string
        question = question.replace(new RegExp(/&#039;/, 'g'), "'");    // string manipulation. replaces charachters in the string
        question = question.replace(new RegExp(/&eacute;/, 'g'), "é");  // string manipulation. replaces charachters in the string

        return <div>
            <h3>Q{this.props.index}. {question}</h3>
            {this.answers.map(answers => {      // loops through the answers and renders them
                answers = answers.replace(new RegExp(/&quot;/, 'g'), '"');  // string manipulation. replaces charachters in the string
                answers = answers.replace(new RegExp(/&#039;/, 'g'), "'");  // string manipulation. replaces charachters in the string
                answers = answers.replace(new RegExp(/&eacute;/, 'g'), "é");    // string manipulation. replaces charachters in the string
                answers = answers.replace(new RegExp(/&amp;/, 'g'), "&");  // string manipulation. replaces charachters in the string
                return <div key={answers}><input checked={this.state.answers === answers} disabled={this.state.validated} onChange={() => this.setAnswer(answers)} type="radio" value={answers} name={this.props.question} /> {answers}</div>
            })}     {/* disables if the question has been validated and uppdates the state with the current answer onclick*/}
        </div>
    }
}

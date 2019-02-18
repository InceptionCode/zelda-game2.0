import React, { Component } from 'react';
import Message from './Message.jsx';

export default class Scenario4 extends Component {

  componentWillMount () {

    this.props.addRunOption();
    
  }

  render() {

    const { prepareToCheckAnswer } = this.props,

      blinker =
      (this.props.option !== "") ? {"animation": "none"} : {},

      enterOption =
        (this.props.option !== "") ?
        {
          "display": "initial",
          "animation": "blinker ease-in-out 1s infinite"
        } :
        {"display": "none"};

    return(
      <div className = "scenario-4">
        <Message message = { this.props.message } clearMessage = {this.props.clearMessage } />
        <p>
          Link finds Zelda and an army running his way.
          <br/>
          What option will you choose {this.props.userName}?
          <br/>
          1. Kiss Zelda, throw her your "sword" and run away?
          <br/>
          2. Throw "hook" into a window and jump out with Zelda?
          <br/>
          3. Take your "pen" and write 'I give up', on Zelda?
          <br/>
          4. Wave your "flashlight" and hope help comes?
          <br/>
          5. Tie the "rope" onto Zelda and run away?
          <br/>
          Bonus Choice. Just "run" away.
        </p>
        <input onChange = {this.props.changeOption}
          type = "text" placeholder = "Make your choose here..."
          value = {this.props.option} style = { blinker }
          onKeyPress = { (e)=> prepareToCheckAnswer(e, this.props.option, "run", "hook") }/>
        <br/>
        <h2 className = "continue-game" style = { enterOption }> Press Enter to move on...</h2>
      </div>
    );

  }

}

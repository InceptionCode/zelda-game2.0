import React from 'react';
import Message from './Message.jsx';

export default function Scenario1 (props) {

  const { prepareToCheckAnswer } = props,

      blinker =
        (props.option !== "") ? {"animation": "none"} : {},

      enterOption =
        (props.option !== "") ?
        {
          "display": "initial",
          "animation": "blinker ease-in-out 1s infinite"
        } :
        {"display": "none"};

    return(
      <div className = "scenario-1">
        <Message message= {props.message} clearMessage = {props.clearMessage} />
        <h1> Hello {props.userName} </h1>
        <p>
          Link has made it inside the castle that rests barely above a huge body of water.
          <br/>
          It seems that the first room is flooded and water is rising quickly.
          <br/>
          What option will you choose {props.userName}?
          <br/>
          1. Tie a knot on your "rope" and use it to swing from the ceiling to the other room?
          <br/>
          2. Use the "flashlight" in order to search for an extra object or path you can exploit?
          <br/>
          3. Throw a "pen" at the ceiling?
          <br/>
          4. Use the "sword" to find another weak spot in the wall that you can break?
          <br/>
          5. Throw your "hook" at the ceiling and use it swing to the other room?
        </p>
        <input onChange = {props.changeOption}
          type = "text" placeholder = "Make your choose here..."
          value = {props.option} style = { blinker }
          onKeyPress = { (e)=> prepareToCheckAnswer(e, props.option, "hook", "rope") }/>
        <br/>
        <h2 className = "continue-game" style = { enterOption }> Press Enter to move on...</h2>
      </div>
    );

}

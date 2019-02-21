import React, { Component } from 'react'
import Message from '../Message/Message'

export default function Scenario2(props) {
  const { prepareToCheckAnswer } = props,
    blinker = props.option !== '' ? { animation: 'none' } : {},
    enterOption =
      props.option !== ''
        ? {
            display: 'initial',
            animation: 'blinker ease-in-out 1s infinite'
          }
        : { display: 'none' }

  return (
    <div className="scenario-2">
      <Message message={props.message} clearMessage={props.clearMessage} />
      <p>
        Link finds 5 huge guards in the next room.
        <br />
        What option will you choose {props.userName}?
        <br />
        1. Use your "sword" to cut the guards down?
        <br />
        2. Use the "flashlight" in order to blind the guards?
        <br />
        3. Throw a "pen" for a distraction?
        <br />
        4. Use the "rope" to grab one guard at a time?
        <br />
        5. Throw "hook" at guards?
      </p>
      <input
        onChange={props.changeOption}
        type="text"
        placeholder="Make your choose here..."
        value={props.option}
        style={blinker}
        onKeyPress={e => prepareToCheckAnswer(e, props.option, 'sword', 'pen')}
      />
      <br />
      <h2 className="continue-game" style={enterOption}>
        {' '}
        Press Enter to move on...
      </h2>
    </div>
  )
}

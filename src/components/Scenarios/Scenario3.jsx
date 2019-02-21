import React from 'react'
import Message from '../Message/Message'

export default function Scenario3(props) {
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
    <div className="scenario-3">
      <Message message={props.message} clearMessage={props.clearMessage} />
      <p>
        Link knows there is a trained assasin up ahead in a dark room.
        <br />
        What option will you choose {props.userName}?
        <br />
        1. Run forward with your "sword" up and ready?
        <br />
        2. Use your "hook" in order to break a window?
        <br />
        3. Throw your "pen" and hope for the best?
        <br />
        4. Scan the room with the "flashlight"?
        <br />
        5. Bait assasin with your "rope"?
      </p>
      <input
        onChange={props.changeOption}
        type="text"
        placeholder="Make your choose here..."
        value={props.option}
        style={blinker}
        onKeyPress={e =>
          prepareToCheckAnswer(e, props.option, 'hook', 'flashlight')
        }
      />
      <br />
      <h2 className="continue-game" style={enterOption}>
        {' '}
        Press Enter to move on...
      </h2>
    </div>
  )
}

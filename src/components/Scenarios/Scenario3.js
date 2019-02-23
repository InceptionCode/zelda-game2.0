import React from 'react'
import PropTypes from 'prop-types'
import { useGameSetup } from '../../utilities/customHooks'

const Scenario3 = props => {
  const blinker = props.playerOption !== '' ? { animation: 'none' } : {},
    enterOption =
      props.playerOption !== ''
        ? {
            display: 'initial',
            animation: 'blinker ease-in-out 1s infinite'
          }
        : { display: 'none' }

  const { changePlayerOption, prepareToCheckAnswer } = useGameSetup(props, [
    'hook',
    'flashlight'
  ])

  return (
    <div data-testid="scenario-page" className="scenario-3">
      <p>
        Link knows there is a trained assassin up ahead in a dark room.
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
        5. Bait assassin with your "rope"?
      </p>
      <input
        onChange={e => changePlayerOption(e.target.value)}
        type="text"
        placeholder="Make your choose here..."
        value={props.playerOption}
        style={blinker}
        onKeyDown={e => prepareToCheckAnswer(e, 'scenario4')}
      />
      <br />
      <h2 className="continue-game" style={enterOption}>
        Press Enter to move on...
      </h2>
    </div>
  )
}

Scenario3.propTypes = {
  dispatch: PropTypes.func.isRequired,
  playerOption: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  displayMessage: PropTypes.func.isRequired,
  setPlayerOption: PropTypes.func.isRequired,
  playerHealth: PropTypes.number.isRequired,
  setPlayerHealth: PropTypes.func.isRequired,
  equipment: PropTypes.array.isRequired
}

export default Scenario3

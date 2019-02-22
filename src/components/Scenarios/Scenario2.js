import React from 'react'
import PropTypes from 'prop-types'
import { useGameSetup } from '../../utilities/customHooks'

const Scenario2 = props => {
  const blinker = props.playerOption !== '' ? { animation: 'none' } : {},
    enterOption =
      props.playerOption !== ''
        ? {
            display: 'initial',
            animation: 'blinker ease-in-out 1s infinite'
          }
        : { display: 'none' }

  const { changePlayerOption, prepareToCheckAnswer } = useGameSetup(props, [
    'sword',
    'pen'
  ])
  return (
    <div data-testid="scenario-page" className="scenario-2">
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
        onChange={e => changePlayerOption(e.target.value)}
        type="text"
        placeholder="Make your choose here..."
        value={props.playerOption}
        style={blinker}
        onKeyDown={e => prepareToCheckAnswer(e, 'scenario3')}
      />
      <br />
      <h2 className="continue-game" style={enterOption}>
        Press Enter to move on...
      </h2>
    </div>
  )
}

Scenario2.propTypes = {
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

export default Scenario2

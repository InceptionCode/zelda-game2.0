import React from 'react'
import PropTypes from 'prop-types'
import { useGameSetup } from '../../utilities/customHooks'

const Scenario1 = props => {
  const blinker = props.playerOption !== '' ? { animation: 'none' } : {},
    enterOption =
      props.playerOption !== ''
        ? {
            display: 'initial',
            animation: 'blinker ease-in-out 1s infinite'
          }
        : { display: 'none' }

  const { changePlayerOption, prepareToCheckAnswer } = useGameSetup(props, [
    'rope',
    'hook'
  ])

  return (
    <div data-testid="scenario-page" className="scenario-1">
      <h1> Hello {props.userName} </h1>
      <p>
        Link has made it inside the castle that rests barely above a huge body
        of water.
        <br />
        It seems that the first room is flooded and water is rising quickly.
        <br />
        What option will you choose {props.userName}?
        <br />
        1. Tie a knot on your "rope" and use it to swing from the ceiling to the
        other room?
        <br />
        2. Use the "flashlight" in order to search for an extra object or path
        you can exploit?
        <br />
        3. Throw a "pen" at the ceiling?
        <br />
        4. Use the "sword" to find another weak spot in the wall that you can
        break?
        <br />
        5. Throw your "hook" at the ceiling and use it swing to the other room?
      </p>
      <input
        onChange={e => changePlayerOption(e.target.value)}
        type="text"
        placeholder="Make your choose here..."
        value={props.playerOption}
        style={blinker}
        onKeyDown={e => prepareToCheckAnswer(e, 'scenario2')}
      />
      <br />
      <h2 className="continue-game" style={enterOption}>
        Press Enter to move on...
      </h2>
    </div>
  )
}

Scenario1.propTypes = {
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

export default Scenario1

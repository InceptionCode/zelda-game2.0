import React from 'react'
import PropTypes from 'prop-types'
import { useGameSetup } from '../../utilities/customHooks'

const Scenario4 = props => {
  const blinker = props.playerOption !== '' ? { animation: 'none' } : {},
    enterOption =
      props.playerOption !== ''
        ? {
            display: 'initial',
            animation: 'blinker ease-in-out 1s infinite'
          }
        : { display: 'none' }

  const { changePlayerOption, prepareToCheckAnswer } = useGameSetup(props, [
    'run',
    'hook'
  ])

  return (
    <div data-testid="scenario-page" className="scenario-4">
      <p>
        Link finds Zelda and an army running his way.
        <br />
        What option will you choose {props.userName}?
        <br />
        1. Kiss Zelda, throw her your "sword" and run away?
        <br />
        2. Throw "hook" into a window and jump out with Zelda?
        <br />
        3. Take your "pen" and write 'I give up', on Zelda?
        <br />
        4. Wave your "flashlight" and hope help comes?
        <br />
        5. Tie the "rope" onto Zelda and run away?
        <br />
        Bonus Choice. Just "run" away.
      </p>
      <input
        onChange={e => changePlayerOption(e.target.value)}
        type="text"
        placeholder="Make your choose here..."
        value={props.playerOption}
        style={blinker}
        onKeyDown={e => prepareToCheckAnswer(e, 'credits')}
      />
      <br />
      <h2 className="continue-game" style={enterOption}>
        Press Enter to move on...
      </h2>
    </div>
  )
}
Scenario4.propTypes = {
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

export default Scenario4

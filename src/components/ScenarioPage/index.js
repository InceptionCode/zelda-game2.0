import React, { useState, useEffect } from 'react'

import { VALIDATE_AND_SET_ANSWER } from '../../stores/gameStore'
import PropTypes from 'prop-types'

const Scenario = props => {
  const [playerOption, changePlayerOption] = useState('')
  const payload = { playerOption, nextPage: props.nextPage || 'credits' }

  const blinker = playerOption !== '' ? { animation: 'none' } : {},
    enterOption =
      playerOption !== ''
        ? {
            display: 'initial',
            animation: 'blinker ease-in-out 1s infinite'
          }
        : { display: 'none' }

  const resetPlayerOption = () => {
    changePlayerOption('')
  }

  const prepareToCheckAnswer = e => {
    if (e.key === 'Enter') {
      props.dispatch({ type: VALIDATE_AND_SET_ANSWER, payload })
    }
  }

  useEffect(() => {
    resetPlayerOption()
  }, [props.gameState.currentPage])

  return (
    <div data-testid="scenario-page" className="scenario">
      {props.content(props)}
      <input
        type="text"
        placeholder="Make your choice here..."
        value={playerOption}
        style={blinker}
        onChange={e => changePlayerOption(e.target.value)}
        onKeyDown={e => prepareToCheckAnswer(e)}
      />
      <br />
      <h2 className="continue-game" style={enterOption}>
        Press Enter to move on...
      </h2>
    </div>
  )
}

Scenario.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameState: PropTypes.object.isRequired,
  content: PropTypes.func.isRequired,
  nextPage: PropTypes.string
}

export default Scenario

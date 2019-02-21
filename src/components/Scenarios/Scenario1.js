import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import OptionValidationService from '../../services/optionValidationService'

const Scenario1 = props => {
  let optionValidationService
  const blinker = props.playerOption !== '' ? { animation: 'none' } : {},
    enterOption =
      props.playerOption !== ''
        ? {
            display: 'initial',
            animation: 'blinker ease-in-out 1s infinite'
          }
        : { display: 'none' }

  useEffect(() => {
    const { playerHealth, equipment } = props
    const state = { playerHealth, equipment }
    optionValidationService = new OptionValidationService(
      ['rope', 'hook'],
      state
    )
  }, [props.playerOption])

  const changePlayerOption = e => {
    props.setPlayerOption(e.target.value)
  }

  const handleWrongAnswer = () => {
    const health = props.playerHealth - 25
    const equipment = props.equipment.filter(
      item => item !== props.playerOption
    )
    props.setPlayerHealth(health)
    props.dispatch({
      type: 'removeEquipment',
      payload: props.playerOption
    })
    props.displayMessage(true, `Wrong move! You now have ${health}% health!`)
    if (health === 0) handleEndGame('no health')
    if (equipment.length === 0) handleEndGame('no equipment')
  }

  const handleInvalidOption = () => {
    props.displayMessage(
      true,
      "You don't have that item. Try again... make sure you type out the item."
    )
  }

  const handleEndGame = reason => {
    alert(`Game Over!!! ${reason}`)
    props.dispatch({ type: 'reset' })
    props.setPlayerHealth(100)
    props.setPlayerOption('')
    props.setUserName('')
    props.changePage('credits')
  }

  const handleRightAnswer = () => {
    props.dispatch({
      type: 'removeEquipment',
      payload: props.playerOption
    })
    props.changePage('scenario2')
  }

  const handleInvalidCases = reason => {
    switch (reason) {
      case 'wrong answer':
        handleWrongAnswer()
        break
      case 'not an option':
        handleInvalidOption()
        break
      case 'no health':
      case 'no equipment':
        handleEndGame(reason)
        break
      default:
        break
    }
  }

  const prepareToCheckAnswer = e => {
    if (e.key === 'Enter') {
      const [isValid, reason] = optionValidationService.CheckPlayerAnswer(
        props.playerOption.toLowerCase()
      )
      if (!isValid) {
        handleInvalidCases(reason)
      } else {
        handleRightAnswer()
      }
    }
  }

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
        onChange={changePlayerOption}
        type="text"
        placeholder="Make your choose here..."
        value={props.playerOption}
        style={blinker}
        onKeyDown={e => prepareToCheckAnswer(e)}
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

import { useEffect } from 'react'
import OptionValidationService from '../services/optionValidationService'

export const useGameSetup = function(props, correctAnswers) {
  let optionValidationService
  useEffect(() => {
    const { playerHealth, equipment } = props
    const state = { playerHealth, equipment }
    optionValidationService = new OptionValidationService(correctAnswers, state)
  }, [props.playerOption])

  const changePlayerOption = function(option) {
    props.setPlayerOption(option)
  }

  const handleWrongAnswer = function() {
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

  const handleInvalidOption = function() {
    props.displayMessage(
      true,
      "You don't have that item. Try again... make sure you type out the item."
    )
  }

  const handleEndGame = function(reason) {
    alert(`Game Over!!! ${reason}`)
    props.dispatch({ type: 'reset' })
    props.setPlayerHealth(100)
    props.setPlayerOption('')
    props.setUserName('')
    props.changePage('credits')
  }

  const handleRightAnswer = function(nextPage) {
    props.dispatch({
      type: 'removeEquipment',
      payload: props.playerOption
    })
    changePlayerOption('')
    props.changePage(nextPage)
  }

  const handleInvalidCases = function(reason) {
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

  const prepareToCheckAnswer = function(e, nextPage) {
    if (e.key === 'Enter') {
      const [isValid, reason] = optionValidationService.CheckPlayerAnswer(
        props.playerOption.toLowerCase()
      )
      if (!isValid) {
        handleInvalidCases(reason)
      } else {
        handleRightAnswer(nextPage)
      }
    }
  }

  return {
    changePlayerOption,
    prepareToCheckAnswer
  }
}

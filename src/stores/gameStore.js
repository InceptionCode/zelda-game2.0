import OptionValidationService, { WRONG_ANSWER, NO_EQUIPMENT, NO_HEALTH, NOT_AN_OPTION } from '../services/OptionValidationService'

export const SET_PLAYER_NAME = 'SET_PLAYER_NAME'
export const SET_PLAY_STATE = 'SET_PLAY_STATE'
export const VALIDATE_AND_SET_ANSWER = 'VALIDATE_AND_SET_ANSWER'
export const SET_DISPLAY_MESSAGE = 'SET_DISPLAY_MESSAGE'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const RESET_GAME = 'RESET_GAME'

export const initState = function(initialState) {
 return initialState
}

const optionValidationService = new OptionValidationService()


export default function GameStateReducer(state, action) {
  switch (action.type) {
    case SET_PLAY_STATE:
      return { ...state, playState: action.payload }
    case SET_PLAYER_NAME:
      return { ...state, playerName: action.payload.playerName, currentPage: action.payload.currentPage || state.currentPage }
    case SET_DISPLAY_MESSAGE:
      return { ...state, displayMessage: action.payload.displayMessage, message: action.payload.message || '' }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }
    case VALIDATE_AND_SET_ANSWER:
      return returnAnswerState(state, action.payload)
    case RESET_GAME:
      return initState(action.payload)
    default:
      return state
  }

  function removeEquipment(equipment, playerOption) {
    return equipment.filter(
      item => item !== playerOption.toLowerCase()
    )
  }

  function handleWrongAnswer(state, playerOption) {
    const playerHealth = state.playerHealth - 25
    const equipment = removeEquipment(state.equipment, playerOption)
    const message = `Wrong move! You now have ${playerHealth}% health!`
  
    if (playerHealth === 0) {
      return handleEndGame({...state, playerHealth, equipment }, 'no health')
    }

    if (equipment.length === 0) {
      return handleEndGame({...state, playerHealth, equipment }, 'no equipment')
    }

    return { ...state, playerHealth, equipment, displayMessage: true, message }
  }

  function handleInvalidOption(state) {
    const message = "You don't have that item. Try again... make sure you type out the item."
    return { ...state, displayMessage: true, message }
  }
  
  function handleEndGame(state, reason) {
    alert(`Game Over!!! ${reason}`)
    return { ...state, currentPage: 'credits' }
  }
  
  function handleRightAnswer(state, payload) {
    const equipment = removeEquipment(state.equipment, payload.playerOption)
    return { ...state, equipment, currentPage: payload.nextPage }
  }
  
  function handleInvalidCases(state, { playerOption, reason }) {
    switch (reason) {
      case WRONG_ANSWER:
        return handleWrongAnswer(state, playerOption)
      case NOT_AN_OPTION:
        return handleInvalidOption(state, reason)
      case NO_HEALTH:
      case NO_EQUIPMENT:
        return handleEndGame(state, reason)
      default:
        return { ...state, displayMessage: true, message: 'Please choose an option' }
    }
  }
  
  function returnAnswerState(state, payload) {
    // Pass state & correct answers here...
    const [isValid, reason] = optionValidationService.CheckPlayerAnswer(state, payload.playerOption.toLowerCase())
    if (!isValid) {
      payload.reason = reason
      return handleInvalidCases(state, payload)
    } else {
      return handleRightAnswer(state, payload)
    }
  }
}
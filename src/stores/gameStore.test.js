import OptionValidationService, { NOT_AN_OPTION, WRONG_ANSWER, NO_EQUIPMENT, NO_HEALTH }from '../services/OptionValidationService'
import GameStateReducer from './gameStore'
import {
  SET_PLAYER_NAME, 
  SET_PLAY_STATE,
  VALIDATE_AND_SET_ANSWER,
  SET_DISPLAY_MESSAGE,
  SET_CURRENT_PAGE,
  RESET_GAME
} from './gameStore'


const mockCheckPlayerAnswer = jest.fn()

jest.mock('../services/OptionValidationService.js', () => ({
  __esModule: true,
  WRONG_ANSWER: 'wrong answer',
  NOT_AN_OPTION: 'not an option',
  NO_HEALTH: 'no health',
  NO_EQUIPMENT: 'no equipment',
  default: jest.fn().mockImplementation(() => {
    return { CheckPlayerAnswer: (...args) => mockCheckPlayerAnswer(...args) }
  })
}))

describe('GameStateReducer', () => {
  let state, action
  beforeEach(() => {
    state = {
      equipment:  [
        'sword',
        'rope',
        'flashlight'
      ],
      playState: 'playing',
      playerName: 'Dj',
      playerHealth: 100,
      currentPage: 'scenario1',
      message: '',
      displayMessage: false
    }
    action = {}
  })

  describe('when action type defaults in switch case', () => {
    it('should return initial state', () => {
      expect(GameStateReducer(state, action)).toEqual(state)
    })
  })

  describe('When action types w/ payloads are called...', () => {
    it('should set a new player name state if type is "SET_PLAYER_NAME"', () => {
      const expectedNamePayload = { playerName: 'K7NG' } 
      const expectedState = { ...state, playerName: 'K7NG' }
      
      testAction(state, SET_PLAYER_NAME, { payload: expectedNamePayload, state: expectedState })
    })

    it('should set a new play state if type is "SET_PLAY_STATE"', () => {
      const expectedGameState = 'not playing'
      const expectedState = { ...state, playState: expectedGameState }
      
      testAction(state, SET_PLAY_STATE, { payload: expectedGameState, state: expectedState })
      
    })

    it('should set a display message if type is "SET_DISPLAY_MESSAGE"', () => {
      const expectedMessagePayload = { displayMessage: true, message: 'K7NG WINSSSS!!' } 
      const expectedState = { ...state, displayMessage: true, message: 'K7NG WINSSSS!!' }
      
      testAction(state, SET_DISPLAY_MESSAGE, { payload: expectedMessagePayload, state: expectedState })
    })

    it('should set a current page if type is "SET_CURRENT_PAGE"', () => {
      const expectedPagePayload = 'scenario2' 
      const expectedState = { ...state, currentPage: 'scenario2' }
      
      testAction(state, SET_CURRENT_PAGE, { payload: expectedPagePayload, state: expectedState })
    })

    it('should set game state back to initialState if type is "RESET"', () => {
      const expectedState = { ...state }
      const previousState = { ...state, currentPage: 'end-page' }

      action = { type: SET_CURRENT_PAGE, payload: 'end-page' }
      expect(GameStateReducer(state, action)).toEqual(previousState)

      // Test Reset returned original state.
      testAction(previousState, RESET_GAME, { payload: expectedState, state: expectedState })
    })
    
    describe('When "VALIDATE_AND_SET_ANSWER" action is called.', () => {
      const playerAnswer = 'rope'
      const equipment = ['sword', 'flashlight']
      beforeEach(() => {
        action = { type: VALIDATE_AND_SET_ANSWER, payload: { playerOption: playerAnswer, nextPage: 'scenario2' } }
        // Clear all instances and calls to constructor and all methods:
        OptionValidationService.mockClear()
        mockCheckPlayerAnswer.mockClear()
      });
     
      it('should handle default return state if option is not given', () => {
        const expectedState = {
          ...state,
          displayMessage: true,
          message: "Please choose an option"
        }

        mockCheckPlayerAnswer.mockReturnValue([false, null])
        expectMockAnswerAction(state, action, expectedState, playerAnswer)
      })

      it('should handle the right answer and update equipment & currentPage', () => { 
        const expectedState = { ...state, equipment, currentPage: 'scenario2' }

        mockCheckPlayerAnswer.mockReturnValue([true, null])
        expectMockAnswerAction(state, action, expectedState, playerAnswer)
      })

      it('should handle invalid option if users answer is not available', () => {
        const expectedState = {
          ...state,
          displayMessage: true,
          message: "You don't have that item. Try again... make sure you type out the item."
        }

        mockCheckPlayerAnswer.mockReturnValue([false, NOT_AN_OPTION])
        expectMockAnswerAction(state, action, expectedState, playerAnswer)
      })

      it('should handle wrong option if users answer is not correct', () => {
        const expectedState = {
          ...state,
          equipment,
          playerHealth: 75,
          displayMessage: true,
          message: "Wrong move! You now have 75% health!"
        }

        mockCheckPlayerAnswer.mockReturnValue([false, WRONG_ANSWER])
        expectMockAnswerAction(state, action, expectedState, playerAnswer)
      })

      it('should handle missing equipment/health if users answer results in "End Game"', () => {
        const expectedState = {
          ...state,
          currentPage: 'credits'
        }

        mockCheckPlayerAnswer.mockReturnValue([false, NO_HEALTH])

        expectMockAnswerAction(state, action, expectedState, playerAnswer)
        expect(global.alert).toHaveBeenCalledWith(`Game Over!!! ${NO_HEALTH}`)

        mockCheckPlayerAnswer.mockReset()

        mockCheckPlayerAnswer.mockReturnValue([false, NO_EQUIPMENT])

        expectMockAnswerAction(state, action, expectedState, playerAnswer)
        expect(global.alert).toHaveBeenCalledWith(`Game Over!!! ${NO_EQUIPMENT}`)
      })
    })
  })
})

function expectMockAnswerAction(state, action, expectedState, playerAnswer) {
  expect(GameStateReducer(state, action)).toEqual(expectedState)
  expect(mockCheckPlayerAnswer).toHaveBeenCalledWith(state, playerAnswer.toLowerCase())
}

function testAction(state, actionType, expected) {
  const action = { type: actionType, payload: expected.payload }
  expect(GameStateReducer(state, action)).toEqual(expected.state)
  return action
}


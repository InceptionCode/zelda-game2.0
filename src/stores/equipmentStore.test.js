import EquipmentReducer from './equipmentStore'
import {
  ADD_EQUIPMENT,
  REMOVE_EQUIPMENT,
  RESET
} from '../stores/equipmentStore'
describe('EquipmentReducer', () => {
  let state, action
  beforeEach(() => {
    state = ['sword', 'rope', 'pen']
    action = {}
  })

  describe('when action type defaults in switch case', () => {
    it('should return initial state', () => {
      expect(EquipmentReducer(state, action)).toEqual(state)
    })
  })

  describe('when action type is "addEquipment" in switch case', () => {
    it('should return initial state', () => {
      const expectedState = [...state]
      expectedState.push('hamburger')
      action = { type: ADD_EQUIPMENT, payload: 'hamburger' }
      expect(EquipmentReducer(state, action)).toEqual(expectedState)
    })
  })

  describe('when action type is "removeEquipment" in switch case', () => {
    it('should return passed state', () => {
      const expectedState = state.filter(item => item !== 'sword')
      action = { type: REMOVE_EQUIPMENT, payload: 'sword' }
      expect(EquipmentReducer(state, action)).toEqual(expectedState)
    })
  })

  describe('when action type is "reset" in switch case', () => {
    it('should return initial state', () => {
      action = { type: RESET }
      expect(EquipmentReducer(state, action)).toEqual([
        'sword',
        'rope',
        'flashlight',
        'pen',
        'hook'
      ])
    })
  })
})

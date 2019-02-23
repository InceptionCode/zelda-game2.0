export const REMOVE_EQUIPMENT = 'removeEquipment'
export const ADD_EQUIPMENT = 'addEquipment'
export const RESET = 'reset'
export default function EquipmentReducer(state, action) {
  switch (action.type) {
    case REMOVE_EQUIPMENT:
      return [...state].filter(item => item !== action.payload)
    case ADD_EQUIPMENT:
      return [...state, action.payload]
    case RESET:
      return ['sword', 'rope', 'flashlight', 'pen', 'hook']
    default:
      return state
  }
}

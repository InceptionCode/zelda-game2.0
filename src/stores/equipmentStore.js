export default function EquipmentReducer(state, action) {
  switch (action.type) {
    case 'removeEquipment':
      return [...state].filter(item => item !== action.payload)
    case 'addEquipment':
      return state
    case 'reset':
      return ['sword', 'rope', 'flashlight', 'pen', 'hook']
    default:
      return state
  }
}

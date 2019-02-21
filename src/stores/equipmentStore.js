import React from 'react'

export default function EquipmentReducer(state, action) {
  switch (action.type) {
    case 'removeEquipment':
      return [...state].filter(item => item !== action.payload)
    case 'addEquipment':
      return state
    default:
      return state
  }
}

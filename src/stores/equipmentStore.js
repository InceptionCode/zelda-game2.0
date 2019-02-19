import React from 'react'

export default function EquipmentReducer(state, action) {
  switch (action.type) {
    case 'removeEquipment':
      return ''
    case 'addEquipment':
    default:
      throw new Error()
  }
}

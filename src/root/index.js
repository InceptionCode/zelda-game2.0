import React, { useState, useReducer } from 'react'
import Game from './Game.js'

import EquipmentReducer from '../stores/equipmentStore'

export const StoreContext = React.createContext()

export const StoreContextProvider = () => {
  const [playState, setPlayState] = useState('not playing')
  const [playerOption, setPlayerOption] = useState('')
  const [userName, setUserName] = useState('')
  const [playerHealth, setPlayerHealth] = useState(100)
  const [equipment, dispatch] = useReducer(EquipmentReducer, [
    'sword',
    'rope',
    'flashlight',
    'pen',
    'hook'
  ])

  const storeValues = {
    playState,
    setPlayState,
    playerOption,
    setPlayerOption,
    userName,
    setUserName,
    playerHealth,
    setPlayerHealth,
    dispatch,
    equipment
  }

  return (
    <StoreContext.Provider value={storeValues}>
      <Game />
    </StoreContext.Provider>
  )
}

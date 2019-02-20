import React, { useState, useReducer, useMemo } from 'react'
import Game from './Game.js'

import EquipmentReducer from '../stores/equipmentStore'

export const StoreContext = React.createContext()

export const StoreContextProvider = () => {
  const [playState, setPlayState] = useState('not playing')
  const [playerOption, setPlayerOption] = useState('')
  const [userName, setUserName] = useState('')
  const [playerHealth, setPlayerHealth] = useState(100)
  const [state, dispatch] = useReducer(EquipmentReducer, [
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
    state
  }

  return (
    <StoreContext.Provider value={storeValues}>
      <Game />
    </StoreContext.Provider>
  )
}

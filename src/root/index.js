import React from 'react'
import Game from './Game.js'
import { stores } from '../stores/stores'

export const StoreContext = React.createContext()
export const Root = () => {
  return (
    <StoreContext.Provider value={stores}>
      <Game />
    </StoreContext.Provider>
  )
}

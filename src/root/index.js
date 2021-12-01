import React, { useReducer } from 'react'

import GameStateReducer, { initState, RESET_GAME} from '../stores/gameStore'
import GameRouteStrategy from '../services/GameRouteStrategy'
import Message from '../components/Message'


const initialState = {
  equipment:  [
    'sword',
    'rope',
    'flashlight',
    'pen',
    'hook',
    'run'
  ],
  playState: 'not playing',
  playerName: '',
  playerHealth: 100,
  currentPage: 'start',
  message: '',
  displayMessage: false
}

const Game = () => {
  const [gameState, dispatch] = useReducer(GameStateReducer, initialState, initState)
  const resetGame = () => {
    dispatch({ type: RESET_GAME, payload: initialState })
  }

  const pageProps = { gameState, dispatch, resetGame }

  return (
    <>
      {gameState.displayMessage && (
        <Message { ...pageProps } />
      )}
      {GameRouteStrategy.returnPage(pageProps)}
    </>
  )
}

export default Game
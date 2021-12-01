import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Credits from './'

describe('<Credits/>', () => {
  let component, getByTestId, mockResetGame, gameState
  beforeEach(() => {
    gameState = {
      playState: 'not playing',
      playerHealth: 100,
      equipment: ['sword']
    }
    mockResetGame = jest.fn()
  
    component = render(
      <Credits
        gameState={gameState}
        resetGame={mockResetGame}
      />
    )
    getByTestId = component.getByTestId
  })

  it('should render with no problem.', () => {
    expect(getByTestId('credits-page')).toBeTruthy()
  })

  describe('When entering credits.', () => {
    it('should check playState, if user did not enter game an alert should not have shown', () => {
      expect(global.alert).not.toHaveBeenCalled()
    })


    it('should not show "you won" if health is 0 or no equipment.', () => {
      gameState.playState = 'playing'
      gameState.playerHealth = 0

      component.rerender(
        <Credits
          gameState={gameState}
          resetGame={mockResetGame}
        />
      )

      expect(global.alert).not.toHaveBeenCalledWith('You Won!!')

      gameState.playerHealth = 100
      gameState.equipment = []

      component.rerender(
        <Credits
          gameState={gameState}
          resetGame={mockResetGame}
        />
      )

      expect(global.alert).not.toHaveBeenCalledWith('You Won!!')
    })

    it('should reset game when restart button is clicked', () => {
      gameState.playState = 'playing'

      component.rerender(
        <Credits
          gameState={gameState}
          resetGame={mockResetGame}
        />
      )

      fireEvent.click(getByTestId('restart-btn'))

      expect(mockResetGame).toHaveBeenCalled()
    })
  })
})

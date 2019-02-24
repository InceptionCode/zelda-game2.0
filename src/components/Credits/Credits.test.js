import React from 'react'
import { render } from 'react-testing-library'

import Credits from './Credits'

describe('<Credits/>', () => {
  let component, playState, playerHealth, equipment, getByTestId
  beforeEach(() => {
    playState = 'not playing'
    playerHealth = 100
    equipment = ['sword']
    component = render(
      <Credits
        playState={playState}
        playerHealth={playerHealth}
        equipment={equipment}
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
      playState = 'playing'
      playerHealth = 0
      component.rerender(
        <Credits
          playState={playState}
          playerHealth={playerHealth}
          equipment={equipment}
        />
      )
      expect(global.alert).not.toHaveBeenCalledWith('You Won!!')
    })

    it('should check playState, if user did enter game an alert should show', () => {
      playState = 'playing'
      component.rerender(
        <Credits
          playState={playState}
          playerHealth={playerHealth}
          equipment={equipment}
        />
      )
      expect(global.alert).toHaveBeenCalledWith('You Won!!')
    })
  })
})

import React from 'react'
import { render } from 'react-testing-library'

import Credits from './Credits'

describe('<Credits/>', () => {
  let component, playState, getByTestId
  beforeEach(() => {
    playState = 'not playing'
    component = render(<Credits playState={playState} />)
    getByTestId = component.getByTestId
  })

  it('should render with no problem.', () => {
    expect(getByTestId('credits-page')).toBeTruthy()
  })

  describe('When entering credits.', () => {
    it('should check playState, if user did not enter game an alert should not have shown', () => {
      expect(global.alert).not.toHaveBeenCalled()
    })
    it('should check playState, if user did enter game an alert should show', () => {
      playState = 'playing'
      component.rerender(<Credits playState={playState} />)
      expect(global.alert).toHaveBeenCalledWith('You Won!!')
    })
  })
})

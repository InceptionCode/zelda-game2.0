import React from 'react'
import { render } from '@testing-library/react'

import Game from './'
// automatically unmount and cleanup DOM after the test is finished.

describe('<Game/>', () => {
  let gameFragment 
  beforeEach(() => {
    gameFragment = render(<Game />).asFragment
  })

  it('should render with no problem.', () => {
    expect(gameFragment()).toBeTruthy()
  })

  it('should render start page initially.', () => {
    expect(gameFragment().querySelector('#start-menu')).toBeTruthy()
  })

  it('should not render message initially', () => {
    expect(gameFragment().querySelector('.message-overlay')).toBeFalsy()
  })
})

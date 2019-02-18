import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Game from './Game'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('<Game/>', () => {
  it('should render with no problem.', () => {
    const { asFragment } = render(<Game />)
    expect(asFragment()).toBeTruthy()
  })

  it('should render start page initially.', () => {
    const { asFragment } = render(<Game />)
    expect(asFragment().querySelector('#start-menu')).toBeTruthy()
  })

  it('should not render message initially', () => {
    const { asFragment } = render(<Game />)
    expect(asFragment().querySelector('.message-overlay')).toBeFalsy()
  })
})

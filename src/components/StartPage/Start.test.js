import React, { useState } from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  act
} from 'react-testing-library'

import Start from './Start'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('<Start/>', () => {
  let mockChangePage, mockDisplayMessage, getByTestId
  beforeEach(() => {
    mockChangePage = jest.fn()
    mockDisplayMessage = jest.fn()
    getByTestId = render(
      <Start changePage={mockChangePage} displayMessage={mockDisplayMessage} />
    ).getByTestId
  })

  it('should render with no problem.', () => {
    expect(getByTestId('start-page')).toBeTruthy()
  })

  it('should render <h2> title if introVid state !== 10.', () => {
    expect(getByTestId('start-page').querySelector('h2').innerHTML).toEqual(
      'History of Zelda'
    )
  })

  jest.useFakeTimers()
  jest.runAllTimers()
  // Cannot figure out how to test after 10 seconds
  xit('should render two buttons, one starts the game the other roll credits when state.introVid === 10.', async () => {
    const { getByTestId, getByText } = render(
      <Start changePage={mockChangePage} displayMessage={mockDisplayMessage} />
    )
    const startPage = getByTestId('start-page')
    const startButton = await waitForElement(() =>
      getByText(startPage, 'Start')
    )
    const creditsButton = await waitForElement(() =>
      getByText(startPage, 'Roll Credits')
    )

    expect(startButton).toBeTruthy()
    expect(creditsButton).toBeTruthy()
  })

  describe.skip('Button functionality', () => {
    let buttons
    beforeEach(() => {
      buttons = getByTestId('start-page').querySelectorAll('button')
    })

    it('should start game by calling changePage("intro")', () => {
      const startButton = buttons[0]
      fireEvent.click(startButton)
      expect(mockChangePage).toHaveBeenCalledWith('intro')
    })

    it('should show credits for game by calling changePage("credits")', () => {
      const creditsButton = buttons[1]
      fireEvent.click(creditsButton)
      expect(mockChangePage).toHaveBeenCalledWith('credits')
    })
  })
})

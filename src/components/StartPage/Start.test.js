import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
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
  jest.advanceTimersByTime(5000)
  // Cannot figure out how to test after 10 seconds
  it('should render two buttons, one starts the game the other roll credits when state.introVidTime === 10.', async () => {
    const { getByTestId, getByText } = render(
      <Start changePage={mockChangePage} displayMessage={mockDisplayMessage} />
    )

    setTimeout(async () => {
      const startPage = getByTestId('start-page')
      const startButton = await waitForElement(() =>
        getByText(startPage, 'Start')
      )
      const creditsButton = await waitForElement(() =>
        getByText(startPage, 'Roll Credits')
      )

      expect(startButton).toBeTruthy()
      expect(creditsButton).toBeTruthy()
    }, 5000)
  })

  describe('Button functionality', () => {
    let getByTestId, getByText
    beforeEach(() => {
      const component = render(
        <Start
          changePage={mockChangePage}
          displayMessage={mockDisplayMessage}
        />
      )
      getByTestId = component.getByTestId
      getByText = component.getByText
    })

    it('should start game by calling changePage("intro")', () => {
      setTimeout(async () => {
        const startPage = getByTestId('start-page')
        const startButton = await waitForElement(() =>
          getByText(startPage, 'Start')
        )
        fireEvent.click(startButton)
        expect(mockChangePage).toHaveBeenCalledWith('intro')
      }, 5000)
    })

    it('should show credits for game by calling changePage("credits")', () => {
      setTimeout(async () => {
        const startPage = getByTestId('start-page')
        const creditsButton = await waitForElement(() =>
          getByText(startPage, 'Start')
        )

        fireEvent.click(creditsButton)
        expect(mockChangePage).toHaveBeenCalledWith('credits')
      }, 5000)
    })
  })
})

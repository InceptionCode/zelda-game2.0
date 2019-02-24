import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Start from './Start'

// automatically unmount and cleanup DOM after the test is finished.

describe('<Start/>', () => {
  let mockChangePage, mockDisplayMessage, getByTestId
  beforeEach(() => {
    mockChangePage = jest.fn()
    mockDisplayMessage = jest.fn()
    getByTestId = render(<Start changePage={mockChangePage} />).getByTestId
  })

  it('should render with no problem.', () => {
    expect(getByTestId('start-page')).toBeTruthy()
  })

  it('should render <h2> title if introVid state !== 10.', () => {
    expect(getByTestId('start-page').querySelector('h2').innerHTML).toEqual(
      'History of Zelda'
    )
  })

  // Cannot figure out how to test after 10 seconds
  it('should render two buttons, one starts the game the other roll credits when state.introVidTime === 10.', async () => {
    const { getByText } = render(
      <Start changePage={mockChangePage} test={true} />
    )
    let startButton, creditsButton
    startButton = getByText('Start')
    creditsButton = getByText('Roll Credits')
    expect(startButton).toBeTruthy()
    expect(creditsButton).toBeTruthy()
  })

  describe('Button functionality', () => {
    let getByText
    beforeEach(() => {
      const component = render(
        <Start changePage={mockChangePage} test={true} />
      )
      getByTestId = component.getByTestId
      getByText = component.getByText
    })

    it('should start game by calling changePage("intro")', () => {
      let startButton = getByText('Start')
      fireEvent.click(startButton)
      expect(mockChangePage).toHaveBeenCalledWith('intro')
    })

    it('should show credits for game by calling changePage("credits")', () => {
      let startButton = getByText('Roll Credits')
      fireEvent.click(startButton)
      expect(mockChangePage).toHaveBeenCalledWith('credits')
    })
  })
})

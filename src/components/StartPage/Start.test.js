import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import Start from './'

describe('<Start/>', () => {
  let mockDispatch, getByTestId
  beforeEach(() => {
    mockDispatch = jest.fn()
    getByTestId = render(<Start dispatch={mockDispatch} />).getByTestId
  })

  it('should render with no problem.', () => {
    expect(getByTestId('start-page')).toBeTruthy()
  })

  it('should render <h2> title if introVid state !== 10.', () => {
    expect(getByTestId('start-page').querySelector('h2').innerHTML).toEqual(
      'History of Zelda'
    )
  })

  it('should render two buttons, one starts the game the other roll credits when state.introVidTime === 10.', async () => {
    const { getByText } = render(
      <Start dispatch={mockDispatch} test={true} />
    )

    const startButton = await waitFor(() => getByText('Start'))
    const creditsButton = await waitFor(() => getByText('Roll Credits'))

    expect(startButton).toBeTruthy()
    expect(creditsButton).toBeTruthy()
  })

  describe('Button functionality', () => {
    let getByText, dispatchPayload
    beforeEach(() => {
      const component = render(
        <Start dispatch={mockDispatch} test={true} />
      )
      getByTestId = component.getByTestId
      getByText = component.getByText
    })

    it('should start game by calling dispatch("intro")', () => {
      const startButton = getByText('Start')
      dispatchPayload = { payload: "intro", type: "SET_CURRENT_PAGE" }

      fireEvent.click(startButton)

      expect(mockDispatch).toHaveBeenCalledWith(dispatchPayload)
    })

    it('should show credits for game by calling dispatch("credits")', () => {
      dispatchPayload = { payload: "credits", type: "SET_CURRENT_PAGE" }
      let startButton = getByText('Roll Credits')

      fireEvent.click(startButton)

      expect(mockDispatch).toHaveBeenCalledWith(dispatchPayload)
    })
  })
})

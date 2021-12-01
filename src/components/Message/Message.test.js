import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Message from './'

// automatically unmount and cleanup DOM after the test is finished.

describe('<Message/>', () => {
  let mockDispatch, getByTestId, getByPlaceholderText, component, action

  beforeEach(() => {
    mockDispatch = jest.fn()
    component = render(
      <Message dispatch={ mockDispatch } gameState={ { message: "Test message" } } />
    )

    getByPlaceholderText = component.getByPlaceholderText
    getByTestId = component.getByTestId

    action = { type: "SET_DISPLAY_MESSAGE",  payload: { displayMessage: false } }
  })

  it('should render (message) with no problem.', () => {
    const messageComp = getByTestId('message-component')
    expect(messageComp).toBeTruthy()
    expect(messageComp.querySelector('p').innerHTML).toEqual('Test message')
  })

  describe('closing the message', () => {
    it('when user presses enter on the input it should close the message.', () => {
      const messageComp = getByTestId('message-component')
      const input = getByPlaceholderText('Press Enter to Close Message')

      expect(messageComp).toBeTruthy()
      fireEvent.keyDown(input, { key: 'Enter' })
      expect(mockDispatch).toHaveBeenCalledWith(action)
    })

    it('should not close the message if key is not "enter"', () => {
      const messageComp = getByTestId('message-component')
      const input = getByPlaceholderText('Press Enter to Close Message')

      expect(messageComp).toBeTruthy()
      fireEvent.keyDown(input, { key: 'Backspace' })
      expect(mockDispatch).not.toHaveBeenCalledWith(action)
    })
  })
})

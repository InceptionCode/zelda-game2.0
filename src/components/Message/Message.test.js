import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from 'react-testing-library'

import Message from './Message'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('<Message/>', () => {
  let mockDisplayMessage, getByTestId
  beforeEach(() => {
    mockDisplayMessage = jest.fn()
    getByTestId = render(
      <Message displayMessage={mockDisplayMessage} message="Test message" />
    ).getByTestId
  })

  it('should render (message) with no problem.', () => {
    const messageComp = getByTestId('message-component')
    expect(messageComp).toBeTruthy()
    expect(messageComp.querySelector('p').innerHTML).toEqual('Test message')
  })

  describe('closing the message', () => {
    let getByPlaceholderText, component
    beforeEach(() => {
      component = render(
        <Message displayMessage={mockDisplayMessage} message="Test message" />
      )
      getByPlaceholderText = component.getByPlaceholderText
      getByTestId = component.getByTestId
    })

    it('when user presses enter on the input it should close the message.', () => {
      const messageComp = getByTestId('message-component')
      const input = getByPlaceholderText('Press Enter to Close Message')
      expect(messageComp).toBeTruthy()
      fireEvent.keyDown(input, { key: 'Enter' })
      expect(mockDisplayMessage).toHaveBeenCalledWith(false)
    })
  })
})

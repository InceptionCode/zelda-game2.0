import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'

import Intro from './Intro'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('<Intro/>', () => {
  let component,
    mockChangePage,
    mockDisplayMessage,
    mockSetUserName,
    asFragment,
    getByPlaceholderText
  beforeEach(() => {
    mockChangePage = jest.fn()
    mockDisplayMessage = jest.fn()
    mockSetUserName = jest.fn()

    component = render(
      <Intro
        changePage={mockChangePage}
        displayMessage={mockDisplayMessage}
        setUserName={mockSetUserName}
      />
    )
    getByPlaceholderText = component.getByPlaceholderText
    asFragment = component.asFragment
  })

  jest.useFakeTimers()

  it('should render with no problem.', () => {
    expect(asFragment()).toBeTruthy()
  })

  describe('User input', () => {
    it('should run "setUserName" once the input is changed', () => {
      const inputField = getByPlaceholderText('Enter your name')
      expect(inputField.value).toEqual('')
      fireEvent.change(inputField, { target: { value: 'Darrell' } })
      expect(mockSetUserName).toHaveBeenCalledWith('Darrell')
      expect(inputField.value).toEqual('Darrell')
    })

    it('should call displayMessage if userName is not set.', () => {
      component.rerender(
        <Intro
          changePage={mockChangePage}
          displayMessage={mockDisplayMessage}
          setUserName={mockSetUserName}
          userName=""
        />
      )
      const inputField = getByPlaceholderText('Enter your name')
      fireEvent.keyDown(inputField, { key: 'Enter' })
      expect(mockDisplayMessage).toHaveBeenCalledWith(
        true,
        'Please add username.'
      )
    })

    it('should changePage to "scenario1" once user enters name.', () => {
      const inputField = getByPlaceholderText('Enter your name')
      fireEvent.change(inputField, { target: { value: 'Darrell' } })
      fireEvent.keyDown(inputField, { key: 'Enter' })
      expect(mockChangePage).toHaveBeenCalledWith('scenario1')
    })
  })
})

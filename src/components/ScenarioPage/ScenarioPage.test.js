import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { VALIDATE_AND_SET_ANSWER } from '../../stores/gameStore'

import ScenarioPage from '.'
import Scenario1 from './scenarioContent/Scenario1'

// automatically unmount and cleanup DOM after the test is finished.

describe('<ScenarioPage/>', () => {
  let component,
    mockGameState,
    mockDispatch,
    getByTestId,
    getByPlaceholderText,
    getByText,
    rerender
  beforeEach(() => {
    mockGameState = {
      equipment:  ['rope', 'sword'],
      playState: 'playing',
      playerName: 'Darrell',
      playerHealth: 100,
      currentPage: 'scenario1',
      message: '',
      displayMessage: false
    }
    mockDispatch = jest.fn()
    component = render(
      <ScenarioPage
        gameState={mockGameState}
        dispatch={mockDispatch}
        nextPage="scenario2"
        content={props => <Scenario1 {...props }/>}
      />
    )
    getByTestId = component.getByTestId
    getByPlaceholderText = component.getByPlaceholderText
    getByText = component.getByText
    rerender = component.rerender
  })

  it('should render with no problem.', () => {
    expect(getByTestId('scenario-page')).toBeTruthy()
  })

  it('should show userName in scenario.', () => {
    expect(getByText(`Hello ${mockGameState.playerName}`)).toBeTruthy()
  })

  describe('User input/option', () => {
    it('should call setPlayerOption onChange.', () => {
      const input = getByPlaceholderText(/Make your choice here.../i)
      let playerOption = 'rope'

      expect(input).toHaveAttribute('type', 'text')
      expect(input.value).toEqual('')

      fireEvent.change(input, { target: { value: playerOption } })

      rerender(
        <ScenarioPage
          gameState={mockGameState}
          dispatch={mockDispatch}
          nextPage="scenario2"
          content={props => <Scenario1 {...props }/>}
        />
      )

      expect(input.value).toEqual(playerOption)
    })

    it('should dispatch validate and set action onEnter.', () => {
      const input = getByPlaceholderText(/Make your choice here.../i)
      const nextPage = 'scenario2'
      let playerOption = 'rope'

      fireEvent.change(input, { target: { value: playerOption } })

      expect(input).toHaveAttribute('type', 'text')
      expect(input.value).toEqual(playerOption)

      fireEvent.keyDown(input, { key: 'Enter', code: 13 })
      expect(mockDispatch).toHaveBeenCalledWith({ type: VALIDATE_AND_SET_ANSWER, payload: { playerOption, nextPage } })
    })
  })
})
import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import {
  REMOVE_EQUIPMENT,
  RESET,
  ADD_EQUIPMENT
} from '../../../stores/equipmentStore'
import Scenario from '../Scenario4'

// automatically unmount and cleanup DOM after the test is finished.

describe('<Scenario/>', () => {
  let component,
    mockChangePage,
    mockDisplayMessage,
    mockSetPlayerOption,
    mockSetPlayerHealth,
    mockSetUserName,
    mockDispatch,
    equipment,
    playerHealth,
    playerOption,
    userName,
    getByTestId,
    getByPlaceholderText,
    getByText,
    rerender
  beforeEach(() => {
    mockChangePage = jest.fn()
    mockDisplayMessage = jest.fn()
    mockSetPlayerOption = jest.fn()
    mockSetPlayerHealth = jest.fn()
    mockSetUserName = jest.fn()
    mockDispatch = jest.fn()
    userName = 'Darrell'
    playerHealth = 100
    equipment = ['run', 'sword']
    playerOption = ''
    component = render(
      <Scenario
        changePage={mockChangePage}
        displayMessage={mockDisplayMessage}
        playerOption={playerOption}
        setPlayerOption={mockSetPlayerOption}
        setPlayerHealth={mockSetPlayerHealth}
        dispatch={mockDispatch}
        userName={userName}
        setUserName={mockSetUserName}
        playerHealth={playerHealth}
        equipment={equipment}
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

  it('should have added "run" to equipment.', () => {
    const expectedAction = { type: ADD_EQUIPMENT, payload: 'run' }
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
  })

  it('should show userName in scenario.', () => {
    expect(getByText(/What option will you choose Darrell/i)).toBeTruthy()
  })

  describe('User input/option', () => {
    it('should call setPlayerOption onChange.', () => {
      const input = getByPlaceholderText(/Make your choose here.../i)
      expect(input).toHaveAttribute('type', 'text')
      expect(input.value).toEqual(playerOption)
      playerOption = 'rope'
      fireEvent.change(input, { target: { value: playerOption } })
      expect(mockSetPlayerOption).toHaveBeenCalledWith(playerOption)
      rerender(
        <Scenario
          changePage={mockChangePage}
          displayMessage={mockDisplayMessage}
          playerOption={playerOption}
          setPlayerOption={mockSetPlayerOption}
          setPlayerHealth={mockSetPlayerHealth}
          dispatch={mockDispatch}
          setUserName={mockSetUserName}
          userName={userName}
          playerHealth={playerHealth}
          equipment={equipment}
        />
      )
      expect(input.value).toEqual(playerOption)
    })
  })

  describe('When user submits their option', () => {
    let input, inputChange, submitOption, triggerRerender
    beforeEach(() => {
      input = getByPlaceholderText(/Make your choose here.../i)
      inputChange = function(value) {
        fireEvent.change(input, { target: { value } })
      }
      submitOption = function(key) {
        fireEvent.keyDown(input, { key })
      }
      triggerRerender = function(
        playerOption,
        playerHealth = 100,
        equipment = ['run', 'sword']
      ) {
        rerender(
          <Scenario
            changePage={mockChangePage}
            displayMessage={mockDisplayMessage}
            playerOption={playerOption}
            setPlayerOption={mockSetPlayerOption}
            setPlayerHealth={mockSetPlayerHealth}
            dispatch={mockDispatch}
            userName={userName}
            setUserName={mockSetUserName}
            playerHealth={playerHealth}
            equipment={equipment}
          />
        )
      }
    })

    it('should not sumbitOption if any other key is used', () => {
      submitOption('Backspace')
      expect(mockDisplayMessage).not.toHaveBeenCalledWith(
        true,
        'Please choose an option'
      )
    })

    it('should display message if answer has not be given', () => {
      submitOption('Enter')
      expect(mockDisplayMessage).toHaveBeenCalledWith(
        true,
        'Please choose an option'
      )
    })

    it('should display a message if answer is wrong, reduce health and remove equipment.', () => {
      // reduce the health first after verifying wrong answer
      playerOption = 'sword'
      inputChange(playerOption)
      triggerRerender(playerOption)
      submitOption('Enter')
      playerHealth = playerHealth - 25
      expect(mockSetPlayerHealth).toHaveBeenCalledWith(playerHealth)
      // remove equipment after verifying wrong answer
      expect(mockDispatch).toHaveBeenCalledWith({
        type: REMOVE_EQUIPMENT,
        payload: playerOption
      })
      // display message that shows their current health%
      expect(mockDisplayMessage).toHaveBeenCalledWith(
        true,
        `Wrong move! You now have ${playerHealth}% health!`
      )
    })

    it('should end game if no health after choosing wrong answer', () => {
      playerOption = 'sword'
      inputChange(playerOption)
      triggerRerender(playerOption, 25)
      submitOption('Enter')
      playerHealth = playerHealth - 100 // no health
      expect(mockSetPlayerHealth).toHaveBeenCalledWith(playerHealth)
      // remove equipment after verifying wrong answer
      expect(mockDispatch).toHaveBeenCalledWith({
        type: REMOVE_EQUIPMENT,
        payload: playerOption
      })

      assertGameOver(
        'no health',
        mockDispatch,
        mockSetPlayerHealth,
        mockSetPlayerOption,
        mockSetUserName,
        mockChangePage
      )
    })

    it('should end game if no equipment after choosing wrong answer', () => {
      playerOption = 'sword'
      inputChange(playerOption)
      triggerRerender(playerOption, 100, ['sword'])
      submitOption('Enter')
      playerHealth = playerHealth - 25
      expect(mockSetPlayerHealth).toHaveBeenCalledWith(playerHealth)
      // remove equipment after verifying wrong answer
      expect(mockDispatch).toHaveBeenCalledWith({
        type: REMOVE_EQUIPMENT,
        payload: playerOption
      })

      assertGameOver(
        'no equipment',
        mockDispatch,
        mockSetPlayerHealth,
        mockSetPlayerOption,
        mockSetUserName,
        mockChangePage
      )
    })

    it('should display a message if user chooses an item that is not available', () => {
      // Simulate user choosing an option/equipment that is not there.\ playerOption = 'sword'
      playerOption = 'hamburger'
      inputChange(playerOption)
      triggerRerender(playerOption)
      submitOption('Enter')
      expect(mockDisplayMessage).toHaveBeenCalledWith(
        true,
        "You don't have that item. Try again... make sure you type out the item."
      )
    })

    it('should remove item, clear playerOption and navigate to next scenario if option is right.', () => {
      playerOption = 'run'
      inputChange(playerOption)
      triggerRerender(playerOption)
      submitOption('Enter')
      expect(mockDispatch).toHaveBeenCalledWith({
        type: REMOVE_EQUIPMENT,
        payload: playerOption
      })
      expect(mockSetPlayerOption).toHaveBeenCalledWith('')
      expect(mockChangePage).toHaveBeenCalledWith('credits')
    })
  })

  describe('when user has no health or equipment', () => {
    let input, inputChange, submitOption, triggerRerender
    beforeEach(() => {
      input = getByPlaceholderText(/Make your choose here.../i)
      inputChange = function(value) {
        fireEvent.change(input, { target: { value } })
      }
      submitOption = function(key) {
        fireEvent.keyDown(input, { key: 'Enter' })
      }
      triggerRerender = function(equipment, playerHealth = 100, playerOption) {
        rerender(
          <Scenario
            changePage={mockChangePage}
            displayMessage={mockDisplayMessage}
            playerOption={playerOption}
            setPlayerOption={mockSetPlayerOption}
            setPlayerHealth={mockSetPlayerHealth}
            dispatch={mockDispatch}
            userName={userName}
            playerHealth={playerHealth}
            equipment={equipment}
            setUserName={mockSetUserName}
          />
        )
      }
    })
    it('should alert(Game Over!!! [reason]-health) rest state, then navigate back to start', () => {
      playerHealth = 0
      playerOption = 'hamburger'
      const reason = 'no health'
      inputChange(playerOption)
      triggerRerender(equipment, playerHealth, playerOption)
      submitOption('Enter')
      assertGameOver(
        reason,
        mockDispatch,
        mockSetPlayerHealth,
        mockSetPlayerOption,
        mockSetUserName,
        mockChangePage
      )
    })
    it('should alert(Game Over!!! [reason]-equipment) rest state, then navigate back to start', () => {
      equipment = []
      playerOption = 'hamburger'
      const reason = 'no equipment'
      inputChange(playerOption)
      triggerRerender(equipment, playerHealth, playerOption)
      submitOption('Enter')
      assertGameOver(
        reason,
        mockDispatch,
        mockSetPlayerHealth,
        mockSetPlayerOption,
        mockSetUserName,
        mockChangePage
      )
    })
  })
})

function assertGameOver(
  reason,
  mockDispatch,
  mockSetPlayerHealth,
  mockSetPlayerOption,
  mockSetUserName,
  mockChangePage
) {
  expect(global.alert).toHaveBeenCalledWith(`Game Over!!! ${reason}`)
  expect(mockDispatch).toHaveBeenCalledWith({ type: RESET })
  expect(mockSetPlayerHealth).toHaveBeenCalledWith(100)
  expect(mockSetPlayerOption).toHaveBeenCalledWith('')
  expect(mockSetUserName).toHaveBeenCalledWith('')
  expect(mockChangePage).toHaveBeenCalledWith('credits')
}

import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from 'react-testing-library'

import Scenario from '../Scenario1'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
global.alert = jest.fn()

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
    equipment = ['rope', 'sword']
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
    rerender = component.rerender
  })

  it('should render with no problem.', () => {
    expect(getByTestId('scenario-page')).toBeTruthy()
  })

  it('should show userName in scenario.', () => {
    const scenario = getByTestId('scenario-page')
    expect(scenario.querySelector('h1').innerHTML.split(' ')).toContain(
      userName
    )
  })

  describe('User input/option', () => {
    it('should call setPlayerOption onChange.', () => {
      const input = getByPlaceholderText('Make your choose here...')
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
      input = getByPlaceholderText('Make your choose here...')
      inputChange = function(value) {
        fireEvent.change(input, { target: { value } })
      }
      submitOption = function() {
        fireEvent.keyDown(input, { key: 'Enter' })
      }
      triggerRerender = function(playerOption, playerHealth = 100) {
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

    it('should display a message if answer is wrong, reduce health and remove equipment.', () => {
      // reduce the health first after verifying wrong answer
      playerOption = 'sword'
      inputChange(playerOption)
      triggerRerender(playerOption)
      submitOption()
      playerHealth = playerHealth - 25
      expect(mockSetPlayerHealth).toHaveBeenCalledWith(playerHealth)
      // remove equipment after verifying wrong answer
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'removeEquipment',
        payload: playerOption
      })
      // display message that shows their current health%
      expect(mockDisplayMessage).toHaveBeenCalledWith(
        true,
        `Wrong move! You now have ${playerHealth}% health!`
      )
    })

    it('should display a message if user chooses an item that is not available', () => {
      // Simulate user choosing an option/equipment that is not there.\ playerOption = 'sword'
      playerOption = 'hamburger'
      inputChange(playerOption)
      triggerRerender(playerOption)
      submitOption()
      expect(mockDisplayMessage).toHaveBeenCalledWith(
        true,
        "You don't have that item. Try again... make sure you type out the item."
      )
    })

    it('should remove item and navigate to next scenario if option is right.', () => {
      playerOption = 'rope'
      inputChange(playerOption)
      triggerRerender(playerOption)
      submitOption()
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'removeEquipment',
        payload: playerOption
      })
      expect(mockChangePage).toHaveBeenCalledWith('scenario2')
    })
  })

  describe('when user has no health or equipment', () => {
    let input, inputChange, submitOption, triggerRerender
    beforeEach(() => {
      input = getByPlaceholderText('Make your choose here...')
      inputChange = function(value) {
        fireEvent.change(input, { target: { value } })
      }
      submitOption = function() {
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
      submitOption()
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
      submitOption()
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
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset' })
  expect(mockSetPlayerHealth).toHaveBeenCalledWith(100)
  expect(mockSetPlayerOption).toHaveBeenCalledWith('')
  expect(mockSetUserName).toHaveBeenCalledWith('')
  expect(mockChangePage).toHaveBeenCalledWith('credits')
}

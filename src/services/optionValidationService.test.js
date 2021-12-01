import OptionValidationService, { NOT_AN_OPTION, NO_EQUIPMENT, NO_HEALTH, RIGHT_ANSWER, WRONG_ANSWER } from './optionValidationService'

describe('OptionValidationService', () => {
  let optionValidationService, correctAnswers, state
  beforeEach(() => {
    state = {
      equipment: ['rope', 'hook', 'sword', 'flashlight'],
      playerHealth: 100,
      currentPage: 'scenario1'
    }
    correctAnswers = ['rope', 'hook']
    optionValidationService = new OptionValidationService(correctAnswers, state)
  })

  describe('when CheckPlayerAnswer is called', () => {
    it('should return "false" and wrong answer (expected reason for failure)', () => {
      const expectedReturn = [false, WRONG_ANSWER]
      assertCheckPlayerAnswer(
        state,
        optionValidationService,
        'sword',
        expectedReturn
      )
    })

    it('should return "true" and right answer (expected reason for success)', () => {
      const expectedReturn = [true, RIGHT_ANSWER]
      assertCheckPlayerAnswer(
        state,
        optionValidationService,
        'rope',
        expectedReturn
      )
    })

    it('should return "false" and not an option (expected reason for failure)', () => {
      const expectedReturn = [false, NOT_AN_OPTION]
      assertCheckPlayerAnswer(
        state,
        optionValidationService,
        'hamburger',
        expectedReturn
      )
    })
  })

  describe('when CheckPlayerHealth is called', () => {
    it('should return "false" and no health (expected reason for failure)', () => {
      const expectedReturn = [false, NO_HEALTH]
      assertCheckPlayerHealth(
        0,
        optionValidationService,
        expectedReturn
      )
    })

    it('should return "true" and has health (expected reason for success)', () => {
      const expectedReturn = [true, 'has health']
      assertCheckPlayerHealth(
        100,
        optionValidationService,
        expectedReturn
      )
    })
  })

  describe('when CheckPlayerEquipment is called.', () => {
    it('should return "false" no equipment (expected reason for failure)', () => {
      const expectedReturn = [false, NO_EQUIPMENT]
      assertCheckPlayerEquipment(
        [],
        optionValidationService,
        expectedReturn
      )
    })

    it('should return "true" and has equipment (expected reason for success)', () => {
      const expectedReturn = [true, 'has equipment']
      assertCheckPlayerEquipment(
        ['equipment'],
        optionValidationService,
        expectedReturn
      )
    })
  })
})


function assertCheckPlayerAnswer(state, service, answer, expectedReturn) {
  expect(service.CheckPlayerAnswer(state, answer)).toEqual(expectedReturn)
}

function assertCheckPlayerHealth(health, service, expectedReturn) {
  expect(service.CheckPlayerHealth(health)).toEqual(expectedReturn)
}

function assertCheckPlayerEquipment(equipment, service, expectedReturn) {
  expect(service.CheckPlayerEquipment(equipment)).toEqual(expectedReturn)
}

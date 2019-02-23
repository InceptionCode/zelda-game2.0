import OptionValidationService from './optionValidationService'

const assertCheckPlayerAnswer = function(
  expect,
  service,
  answer,
  correctAnswers,
  expectedReturn
) {
  expect(service.correctAnswers).toEqual(expect.arrayContaining(correctAnswers))
  expect(service.CheckPlayerAnswer(answer)).toEqual(expectedReturn)
}

const assertCheckPlayerHealth = function(
  expect,
  service,
  correctAnswers,
  expectedReturn
) {
  expect(service.correctAnswers).toEqual(expect.arrayContaining(correctAnswers))
  expect(service.CheckPlayerHealth()).toEqual(expectedReturn)
}

const assertCheckPlayerEquipment = function(
  expect,
  service,
  correctAnswers,
  expectedReturn
) {
  expect(service.correctAnswers).toEqual(expect.arrayContaining(correctAnswers))
  expect(service.CheckPlayerEquipment()).toEqual(expectedReturn)
}

describe('OptionValidationService', () => {
  let optionValidationService, correctAnswers, state
  beforeEach(() => {
    state = {
      equipment: ['rope', 'hook', 'sword'],
      health: 100
    }
    correctAnswers = ['rope', 'hook']
    optionValidationService = new OptionValidationService(correctAnswers, state)
  })

  describe('when CheckPlayerAnswer is called', () => {
    it('should return "false" and wrong answer (expected reason for failure)', () => {
      const expectedReturn = [false, 'wrong answer']
      assertCheckPlayerAnswer(
        expect,
        optionValidationService,
        'sword',
        correctAnswers,
        expectedReturn
      )
    })

    it('should return "true" and right answer (expected reason for success)', () => {
      const expectedReturn = [true, 'right answer']
      assertCheckPlayerAnswer(
        expect,
        optionValidationService,
        'rope',
        correctAnswers,
        expectedReturn
      )
    })

    it('should return "false" and not an option (expected reason for failure)', () => {
      const expectedReturn = [false, 'not an option']
      assertCheckPlayerAnswer(
        expect,
        optionValidationService,
        'hamburger',
        correctAnswers,
        expectedReturn
      )
    })
  })

  describe('when CheckPlayerHealth is called', () => {
    it('should return "false" and no health (expected reason for failure)', () => {
      const expectedReturn = [false, 'no health']
      optionValidationService.health = 0
      assertCheckPlayerHealth(
        expect,
        optionValidationService,
        correctAnswers,
        expectedReturn
      )
    })

    it('should return "true" and has health (expected reason for success)', () => {
      const expectedReturn = [true, 'has health']
      assertCheckPlayerHealth(
        expect,
        optionValidationService,
        correctAnswers,
        expectedReturn
      )
    })
  })

  describe('when CheckPlayerEquipment is called.', () => {
    it('should return "false" no equipment (expected reason for failure)', () => {
      const expectedReturn = [false, 'no equipment']
      optionValidationService.equipment = []
      assertCheckPlayerEquipment(
        expect,
        optionValidationService,
        correctAnswers,
        expectedReturn
      )
    })

    it('should return "true" and has equipment (expected reason for success)', () => {
      const expectedReturn = [true, 'has equipment']
      assertCheckPlayerEquipment(
        expect,
        optionValidationService,
        correctAnswers,
        expectedReturn
      )
    })
  })
})

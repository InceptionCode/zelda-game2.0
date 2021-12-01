const WRONG_ANSWER = 'wrong answer'
const RIGHT_ANSWER = 'right answer'
const NOT_AN_OPTION = 'not an option'
const NO_HEALTH = 'no health'
const NO_EQUIPMENT = 'no equipment'

class OptionValidationService {
  #correctAnswers = {
      'scenario1': ['rope','hook'],
      'scenario2': ['sword','pen'],
      'scenario3': ['hook','flashlight'],
      'scenario4': ['run','hook']
  }

  CheckPlayerHealth(health) {
    return health === 0 ? [false, NO_HEALTH] : [true, 'has health']
  }

  CheckPlayerEquipment(equipment) {
    return equipment.length === 0
      ? [false, NO_EQUIPMENT]
      : [true, 'has equipment']
  }

  CheckPlayerAnswer(state, answer) {
    const scenarioAnswers = this.#correctAnswers[state.currentPage]
    const [hasHealth, healthReason] = this.CheckPlayerHealth(state.playerHealth)
    if (!hasHealth) return [false, healthReason]

    const [hasEquipment, equipmentReason] = this.CheckPlayerEquipment(state.equipment)
    if (!hasEquipment) return [false, equipmentReason]

    if (answer === '') return [false, '']

    const isOption = state.equipment.indexOf(answer)
    if (isOption === -1) return [false, NOT_AN_OPTION]

    const hasCorrectAnswer = scenarioAnswers.indexOf(answer)
    if (hasCorrectAnswer === -1) {
      return [false, WRONG_ANSWER]
    } else {
      return [true, RIGHT_ANSWER]
    }
  }
}

export {
  OptionValidationService as default,
  WRONG_ANSWER,
  RIGHT_ANSWER,
  NOT_AN_OPTION,
  NO_HEALTH,
  NO_EQUIPMENT
}
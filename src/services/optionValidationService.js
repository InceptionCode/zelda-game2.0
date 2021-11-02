export default class OptionValidationService {
  #correctAnswers
  constructor() {
      this.#correctAnswers = {
      'scenario1': ['rope','hook'],
      'scenario2': ['sword','pen'],
      'scenario3': ['hook','flashlight'],
      'scenario4': ['run','hook']
    }
  }


  CheckPlayerHealth(health) {
    return health === 0 ? [false, 'no health'] : [true, 'has health']
  }

  CheckPlayerEquipment(equipment) {
    return equipment.length === 0
      ? [false, 'no equipment']
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
    if (isOption === -1) return [false, 'not an option']

    const hasCorrectAnswer = scenarioAnswers.indexOf(answer)
    if (hasCorrectAnswer === -1) {
      return [false, 'wrong answer']
    } else {
      return [true, 'right answer']
    }
  }
}

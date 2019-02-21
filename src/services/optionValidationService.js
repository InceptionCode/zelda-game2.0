export default class OptionValidationService {
  constructor(correctAnswers, { playerHealth, equipment }) {
    this.correctAnswers = correctAnswers
    this.health = playerHealth
    this.equipment = equipment
  }

  CheckPlayerHealth() {
    return this.health === 0 ? [false, 'no health'] : [true, 'has health']
  }

  CheckPlayerEquipment() {
    return this.equipment.length === 0
      ? [false, 'no equipment']
      : [true, 'has equipment']
  }

  CheckPlayerAnswer(answer) {
    const [hasHealth, healthReason] = this.CheckPlayerHealth()
    if (!hasHealth) return [false, healthReason]

    const [hasEquipment, equipmentReason] = this.CheckPlayerEquipment()
    if (!hasEquipment) return [false, equipmentReason]

    const isOption = this.equipment.indexOf(answer)
    if (isOption === -1) return [false, 'not an option']

    const hasCorrectAnswer = this.correctAnswers.indexOf(answer)
    if (hasCorrectAnswer === -1) {
      return [false, 'wrong answer']
    } else {
      return [true, 'right answer']
    }
  }
}

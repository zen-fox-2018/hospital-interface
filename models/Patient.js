const Model = require('./Model')
const path = './database/patient.json'

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id || 1
    this.name = name
    this.diagnosis = diagnosis
  }
}

module.exports = Patient
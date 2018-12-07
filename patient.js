const fs = require('fs');

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFile() {
    fs.readFile('./')
  }

  static addPatient(id, name, diagnosis) {

  }
}


module.exports = Patient;

const fs = require('fs')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFile(callback){
    fs.readFile('./patient.json', 'utf8', (err, data) => {
      (err) ? callback(err, null) : callback(null, data)
    })
  }

  static findAll(callback) {
    Patient.readFile( (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        let patientData = JSON.parse(data)
        for( let i = 0 ; i < patientData.length ; i++) {
          let id = patientData[i].id
          let name = patientData[i].name
          let diagnosis = patientData[i].diagnosis
          patientData[i] = new Patient(id, name, diagnosis)
        }
        callback(null, patientData)
      }
    })
  }

  static input(id, name, diagnosis, callback) {
    Patient.findAll( (err, readData) => {
      
      if (err) {
        callback(err, null)
      } else {
        readData.push(new Patient(id, name, diagnosis))
        Patient.writeFile(readData, (err) => {
          (err) ? callback(err, null) : callback(null, readData)
        })
      }
    })
  }

  static writeFile(newData, callback) {
    newData = JSON.stringify(newData, null, 2)
    fs.writeFile('./patient.json', newData , 'utf8', (err) => {
      (err) ? callback(err) : callback(null)
    })
  }
}

module.exports = Patient

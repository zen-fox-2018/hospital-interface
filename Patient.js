const fs = require('fs')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFile(cb) {
    fs.readFile('./patient.json', 'utf8', function(err, patients) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, patients)
      }
    })
  }

  static writeFile(data, cb) {
    fs.writeFile('./patient.json',data, function(err) {
      if (err) {
        cb(err)
      }
      else {
        cb(null)
      }
    })
  }

  static findAll(cb) {
    Patient.readFile(function(err, data) {
      if (err) {
        cb(err)
      }
      else {
        let patients = []
        let dataPatients = JSON.parse(data)
        for (let i = 0; i < dataPatients.length; i++) {
          let patient = new Patient (dataPatients[i].id, dataPatients[i].name, dataPatients[i].diagnosis)
          patients.push(patient)
        }
        cb(null, patients)
      }
    })
  }

  static create(obj, cb) {
    Patient.findAll(function(err, dataPatients) {
      if (err) {
        cb(err)
      }
      else {
        let patients = dataPatients
        let newPatientId = patients.length+1
        let newPatient = new Patient(newPatientId, obj.name, obj.diagnosis)
        patients.push(newPatient)
        Patient.writeFile(JSON.stringify(patients, null, 2), function(err) {
          if (err) {
            cb(err)
          }
          else {
            cb(null)
          }
        })
      }
    })
  }
}

module.exports = Patient
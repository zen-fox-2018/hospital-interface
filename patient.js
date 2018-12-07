const fs = require("fs")

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readFile(cb) {
    fs.readFile('./patient.json', 'utf8', function (err, data) {
      if (err) {
        cb(err, null)
      } else {
        cb(null, data)
      }
    })
  }

  static writeFile(data, cb) {
    fs.writeFile('./patient.json', data, 'utf8', function (err) {
      if (err) {
        cb(err)
      } else {
        cb(null)
      }
    })
  }

  static showAll(cb) {
    this.readFile(function (err, data) {
      if (err) {
        cb(err, null)
      } else {
        let JSONparse = JSON.parse(data)
        cb(null, JSONparse)
      }
    })
  }

  static addPatient(newData, cb) {
    this.showAll(function (err, fileData) {
      if (err) {
        cb(err, null)
      } else {

        fileData.push(newData)
        let fileDataJSON = JSON.stringify(fileData, null, 2)

        Patient.writeFile(fileDataJSON, function (err) {
          if (err) {
            cb(err, null)
          } else {
            cb(null, fileData)
          }
        })

      }
    })
  }

}

module.exports = Patient



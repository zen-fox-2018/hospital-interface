const fs = require('fs')

class Patient {
    constructor(obj) {
      this.id = obj['id']
      this.name = obj['name']
      this.diagnosis = obj['diagnosis']
    }
    static readFile(callback) {
        fs.readFile('./patient.json', 'utf8', (err,data) => {
            if(err) callback(err, null)
            else {
                callback(null, data)
            }
        })
    }

    static getAllFile(callback) {
        Patient.readFile ((err,data) => {
            if(err) callback(err,null)
            else {
                let result = []
                data = JSON.parse(data)
                for(let i = 0; i < data.length ; i++ ) {
                    result.push(new Patient (data[i]))
                }
                callback(null, result)
            }
        })
    }

    static addPatientHospital(id, name, diagnosis, callback) {
        Patient.getAllFile((err,data) => {
            if(err) callback(err,null) 
            else {
                let newPatient = new Patient({
                    id: id,
                    name: name,
                    diagnosis : diagnosis
                })
                data.push(newPatient)
              
                this.writeFile(JSON.stringify(data,null,2), (err) => {
                    if(err) callback(err)
                    else    callback(null, data.length)
                })
             
            }
        })
    }
    static writeFile(data,callback) {
        fs.writeFile('./patient.json', data, 'utf8', (err) => {
            if(err) callback(err)
            else callback(null)
        })
    }

  }

  module.exports = Patient
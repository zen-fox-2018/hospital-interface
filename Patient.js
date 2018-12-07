const fs = require('fs')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readDocument(callback){
    fs.readFile('patient.json', function(err,data){
      if(err){
        callback(err, null)
      }
      else {
        callback(null,data)
      }
    })
  }

  static showTheDocument(callback){
    this.readDocument(function(err, data){
      if(err){
        callback(err, null)
      }
      else {
        let rawData = JSON.parse(data)
        let processedData = []
        for (let i = 0; i < rawData.length; i++){
          processedData.push(new Patient(rawData[i].id, rawData[i].name, rawData[i].diagnosis))
        }
        callback(null,processedData)
      }
    })
  }

  static writeDocument(newData, callback){
    fs.writeFile('patient.json',newData, function(err){
      if(err){
        callback(err)
      }
      else {
        callback(null)
      }
    })
  }

  static addNewPatient(newPatient, callback){
    this.showTheDocument(function(err,data){
      if(err){
        callback(err,null)
      }
      else {
        let processedData = data
        //newPatient ini adalah objek literal
        // console.log(newPatient)
        processedData.push(new Patient(newPatient.patientId, newPatient.patientName, newPatient.patientDiagnosis))
        // console.log(processedData)
        let stringified = JSON.stringify(processedData, null, 2)
        Patient.writeDocument(stringified, function(err){
          if(err){
            callback(err, null)
          }
          else{
            callback(null, processedData)
          }
        })
        // callback(null, processedData)
      }
    })
  }

}




module.exports = Patient

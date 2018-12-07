const fs = require('fs');

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static readPatientFile(callback) {
    fs.readFile('./patient.json', 'utf8', (err, data) => {
      if (err) callback(err, null);
      callback(null, JSON.parse(data));
    })
  }

  static readEmployeeFile(callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err) callback(err, null);
      callback(null, JSON.parse(data));
    })
  }

  static writeFile(data, callback) {
    fs.writeFile('./patient.json', data, (err) => {
      if (err) callback(err);
      callback(null);
    })
  }

  static addPatient(id, name, sickness, callback) {
    this.readPatientFile((err, patientData) => {
      if (err) {
        callback(err, null);
      } else {
        this.readEmployeeFile((err,employeeData) => {
          if (err) {
            callback(err);
          } else {
            let isPatient = false;
            for(let i = 0; i < employeeData.length; i++) {
              if (employeeData[i].logIn === true && employeeData[i].role === 'dokter') {
                isPatient = true;
                break;
              } 
            }
            if (isPatient) {
              let id = patientData.length + 1;
              let newPatient = new Patient(id, name, sickness);
              patientData.push(newPatient);
              let saveData = JSON.stringify(patientData, null, 2);
              this.writeFile(saveData, (err) => {
                if (err) {
                  callback(err);
                } else {
                  callback(null, JSON.parse(saveData));
                }
              })
            } else {
              callback(null);
            }
          }
        })  
      }
    })
  }
}


module.exports = Patient;

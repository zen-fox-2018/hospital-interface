const fs = require('fs');
class Patient {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.diagnosis = obj.diagnosis;
  }

  static readFile(callback) {
    fs.readFile('./patient.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }

  static writeFile(data, callback) {
    fs.writeFile('./patient.json', JSON.stringify(data, null, 2),(err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }

  static allPatient(callback) {
    Patient.readFile((err, patients) => {
      if (err) {
        callback(err, null);
      } else {
        let rawData = JSON.parse(patients);
        rawData = rawData.map( e => new Patient(e));
        callback(null, rawData);
      }
    })
  }

  static addPatient(data, callback) {
    Patient.allPatient((err, patients) => {
      let diagnosis = data.slice(1);
      let newPatient = {
        id: patients.length + 1,
        name: data[0],
        diagnosis: diagnosis
      }
      patients.push(new Patient(newPatient));
      Patient.writeFile(patients, (err) => {
        if (err) {
          callback(err)
        } else {
          callback(null, patients.length);
        }
      })

    });
  }
}

module.exports = Patient;

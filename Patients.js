const fs = require("fs")
class Patients {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static create(callback) {
    Patients.readFile(function(err, patientData) {
        if (err) {
            callback(err, null);
        } else {
            let list = [];
            let convertData = JSON.parse(patientData);
            for (let i = 0; i <= convertData.length-1; i++) {
                list.push(new Patients(convertData[i].id, convertData[i].name, convertData[i].diagnosis))
            }
            callback(null, list)
        }
    })
  }

  static newPatient(id, name, diagnosis, employeesList, callback) {
    Patients.create(function(err, patientData) {
        if (err) {
            callback(err, null);
        } else {
            let isDoc = false;
            for (let i = 0; i <= employeesList.length-1; i++) {
                if (employeesList[i].status === 'on' && employeesList[i].position === "dokter") {
                    isDoc = true;
                }
            }
            if (isDoc === true) {
                patientData.push(new Patients(id, name, diagnosis.join(' ')));
                let thedata = JSON.stringify(patientData, null, 2)
                Patients.writeFile(thedata, function(err) {
                    if(err) {
                        callback(err)
                    } else {
                        callback(null, patientData)
                    }
                })
            } else {
                callback(false);
            }
         
        }
    })
  }
  static readFile(callback) {
    fs.readFile("./patients.json", "utf-8", function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    })
}

static writeFile(newData, callback) {
    fs.writeFile("./patients.json", newData, (err) => {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
}
module.exports = Patients



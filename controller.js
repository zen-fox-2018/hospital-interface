const Employee = require('./models/employee.js');
const Patient = require('./models/patient.js');
const View = require('./view.js');

class Controller {

  static registration(name, password, role) {
    Employee.staffReg(name, password, role, (err, data) => {
      if (err) {
        View.displayError(err);
      } else {
        View.succeedReg(data);
      }
    })
  }

  static loginSystem(username, password) {
    Employee.loginData(username, password, (err, data) => {
      if (err) {
        View.displayError(err);
      } else {
        View.succeedLogin(data);
      }
    });
  }

  static patientSystem(id, name, sickness) {
    Patient.addPatient(id, name, sickness, (err, data) => {
      if (err) {
        View.displayError(err);
      } else {
        View.succeedAddPatient(data);
      }
    });
  }

  static logOutSystem(username, password) {
    Employee.logOutAccount(username, password, (err, data) => {
      if (err) {
        View.displayError(err);
      } else {
        View.succeedLogout(data);
      }
    })
  }

}

module.exports = Controller;
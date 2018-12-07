const Employees = require("./Employees.js");
const Patients = require("./Patients.js");
const View = require("./view.js");
class Controller {
    static register(username, password, position) {
        Employees.register(username, password, position, function(err, data) {
            if (err) {
                View.resgistrationFailed(err)
            } else {
                View.registrationSuccess(data) 
            }
        });
    }
    static login(username, password) {
        Employees.logIn(username, password, function(err, name) {
            if (name === false) {
                View.loginFailed()
            } else if (name === undefined){
                View.cantLogin()
            } else {
                View.loginSucceed(name)
            }
        })
    }
    static addPatient(id, name, diagnosis) {
        Employees.employeesList(function(err, employeesList) {
            if (err) {
                View.addPatientFailed();
            } else {
                Patients.newPatient(id, name, diagnosis, employeesList, function(err, listPatient) {
                    if (err) {
                        View.addPatientFailed();
                    } else if (err === false) {
                        View.addPatientFailed();
                    } else {
                        View.addPatientSucceed(listPatient);
                    }
                })
            }
        })
    }
}

module.exports = Controller;
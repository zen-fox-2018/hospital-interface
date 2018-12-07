const Employee = require(`../Models/Employee`)
const Patient = require(`../Models/Patient`)
const View = require(`../Views/View`)

class Controller {

    static register(username, password, role) {
        Employee.register(username, password, role, function (data) {
            if (data.err) {
                View.showError(data)
            } else {
                View.showData(data.msg)
            }
        })
    }

    static login(username, password) {
        Employee.login(username, password, function (data) {
            if (data.err == true) {
                View.errorLogin(data)
            } else {
                View.showData(data.msg)
            }
        })
    }

    static addPatient(patientName, disease) {
        Employee.addPatient(patientName, disease, function (data) {
            if (data.err == true) {
                View.errorLogin(data)
            } else {
                data.isDoctor == true ?
                    Patient.addPatient(patientName, disease, function (data) {
                        data.err == null ?
                            View.succesAddPatient({
                                data: data,
                                msg: data.msg
                            }) :
                            View.showError(data.msg)
                    }) :
                    View.showError(data.msg)
            }
        })
    }

    static delete() {
        Employee.delete()
    }

    static logout(username) {
        Employee.logout(username, function (data) {
            if (data.err == true) {
                View.errorLogout(data)
            } else {
                View.successLogout(data)
            }
        })
    }

}

module.exports = Controller

const View = require("../Views/view");
const Employee = require("../Models/employee");

class Controller {
    static register (name, position, username, password) {
        Employee.registerEmployee(name, position, username, password, function(err, data) {
            if(err){
                View.showRegistered(err)
            } else {
                View.showRegistered(data)
            }
        })
    }

    static findAll() {
        Employee.findAll(function(err, data) {
            if(err) {
                View.showFindAll(err)
            } else {
                View.showFindAll(data)
            }
        })
    }

    static login(username, password) {
        Employee.logIn(username, password, function(err, data) {
            if(err) {
                View.showLogin(err)
            } else {
                View.showLogin(username)
            }
        })
    }

    static addPatients(name, diagnosis) {
        Employee.addPatients(name, diagnosis, function(err, data) {
            if(err) {
                View.showPatients(err)
            } else {
                View.showPatients(data)
            }
        })
    }

    static delete(input) {
        Employee.deleteUser(input, function(err, data) {
            if(err) {
                View.showDeleted(err)
            } else {
                View.showDeleted(data)
            }
        })
    }
}

module.exports = Controller
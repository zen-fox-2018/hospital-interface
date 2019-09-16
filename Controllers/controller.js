
const View = require("../Views/view");
const Employee = require("../Models/employee");

class Controller {
    static register (name, position, username, password) {
        let registerObj = {
            name: name,
            position: position,
            username: username,
            password: password
        }

        Employee.registerEmployee(registerObj, function(err, data) {
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
                View.failedLogin(err)
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

    static logout() {
        Employee.logOutEmployee(function(err, data) {
            if(err) {
                View.showLoggedOut(err)
            } else {
                View.showLoggedOut(data)
            }
        })
    }
}

module.exports = Controller
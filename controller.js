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
}
module.exports = Controller;
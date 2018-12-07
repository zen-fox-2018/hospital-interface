const Employee = require('./Employee.js')
const View = require('./view.js')

class Controller {

    static register(name, username, password, role) {
        Employee.addData(name, username, password, role, function (err, data) {
            if (err) {
                View.registerFailed(err)
            } else {
                View.registerSucceed(data)
            }
        })
    }

    static login(username,password){
        Employee.logIn(username,password,function (err,name) {
            if(name == false) {
                View.loginFailed()
            } else {
                View.loginSucceed(name)
            }
        })
    }
}

module.exports = Controller
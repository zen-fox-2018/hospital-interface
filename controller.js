const User = require('./User.js')
const View = require('./View.js')

class UserController {
    static register(username, password, role) {
        User.readAllFile(username, password, role, function (err, registeredData) {
            if (err) {
                View.showError(err)
            } else {
                View.registerSucceed(registeredData)
            }
        }) 
    }

    static login(username, password) {
        User.loginModel(username, password, (err, data) => {
            if (err) {View.loginFailed()}
            else {View.loginSucceed(username)}
        })
        
    }
}

module.exports = UserController
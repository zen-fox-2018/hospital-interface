const Employee = require('./Employees.js')
const Patient = require('./Patient.js')
const View = require('./View.js')


class UserController {

  static showAll() {
    Employee.findAll( (err, data) => {
      if (err) {
        View.displayError('data')
      } else {
        View.showAll(data)
      }
    })
  }

  static save(id, pass, pos){
    Employee.register(id, pass, pos, (err, data) => {
      if (err) {
        View.displayError('save')
      } else {
        View.writeSuccess(id, data.length)
      }
    })
  }

  static menuLogin(idpass, log) {
    Employee.login(idpass, log, (err, data) => {
      if (err) {
        View.loginFailed('username atau password wrong')
      } else {
        if (log === 'login') {
          View.loginSuccess('login', data)
        } else if (log === 'logout') {
          if (data === null) {
            View.loginFailed('tidak ada user yang login')
          } else if (data){
            View.loginSuccess('logout', data)
          }
        }
      }
    })
  }

  static menuAddPatient(id, name, sick) {
    Employee.addPatient( (isDoctor) => {
      
      if (isDoctor === false) {
        View.displayError(false)
      } else {
        Patient.input(id, name, sick, (err, data) => {
          if (err) {
            View.displayError('patient')
          } else {
            View.addPatientSuccess(data.length)
          }
        })
      }
    })
  }

}

module.exports = UserController
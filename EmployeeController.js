const Employee = require('./Employee.js')
const Patient = require('./Patient.js')

const View = require('./View.js')

class EmployeeController {
  static register(options) {
    let obj = {
      name: options[0],
      username: options[1],
      password: options[2],
      role: options[3]
    }
    let totalEmployees = 0
    let lastData = {}
    Employee.create(obj, function(err, data) {
      if (err) {
        View.error(err)
      }
      else {
        Employee.findAll(function(err, data) {
          if (err) {
            View.error(err)
          }
          else {
            lastData = data[data.length-1]
            totalEmployees = data.length
            let dataSuccess = [lastData, totalEmployees]
            View.registerSuccess(dataSuccess)
          }
        })
      }
    })
  }

  static login(options) {
    let obj = {
      username: options[0],
      password: options[1]
    }
    Employee.login(obj, function(err, data) {
      if (err) {
        View.error(err)
      }
      else {
        View.loginSuccess(obj)
      }
    })
  }

  static addPatient(options) {
    let obj = {
      name: options[0],
      diagnosis: options.slice(1).join(', ')
    }
    Employee.addPatient(obj, function(err, data) {
      if (err) {
        View.error(err)
      }
      else {
        Patient.findAll(function(err, data) {
          if (err) {
            View.error(err)
          }
          else {
            View.successAddPatient(data.length)
          }
        })
      }
    })
  }

  static logout() {
    Employee.logout(function(err, data) {
      if (err) {
        View.error(err)
      }
      else {
        View.logoutSuccess()
      }
    })
  }
}

module.exports = EmployeeController
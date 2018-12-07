const View = require('../views/View.js')
const EmployeeModel = require('../models/employeeModel.js')

class EmployeeController {
    static register(input) {
        EmployeeModel.register(input, function(err, length) {
            if(err) {
                View.displayError('Employee Register Failed')   
            } else {
                View.displaySuccessRegister(`Employee Register Success`, input, length)
            }
        })

    }

    static findAll() {
        EmployeeModel.findAll(function(err, data) {
            if(err) {
                View.displayError('failed')
            } else {
                View.displaySuccess(data)
            }
        })
    }

    static findOne(input) {
        EmployeeModel.findOne(input, function(err, data) {
            if(err) {
                View.displayError('NOT FOUND')
            } else {
                View.displaySuccess(data)
            }
        })
    }

    static login(input) {
        EmployeeModel.login(input, function(err) {
            if(err) {
                View.displayError(err)   
            } else {
                View.displaySuccess(`user ${input.username} log in successfully`)
            }
        })
    }

    static logout(input) {
        EmployeeModel.logout(input, function(err) {
            if(err) {
                View.displayError('Log out Failed')
            } else {
                View.displaySuccess('Log out success')
            }
        })
    }

    static registerPatient(input) {
        EmployeeModel.registerPatient(input, function(err, length) {
            if(err) {
                View.displayError(err)
            } else {
                View.displaySuccessPatient('Success add patient. Patient Total:', length)
            }
        })
    }
}
module.exports = EmployeeController
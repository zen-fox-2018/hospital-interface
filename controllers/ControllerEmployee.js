const Employee = require('../models/Employee')
const Patient = require('../models/Patient')
const View = require('../views/View')

class ControllerEmployee {

    static register(obj) {
        Employee.create(obj, (err, data, length) => {
            err ? View.displayError(err): View.register(data, length)
        })
    }

    static login(obj) {
        Employee.update(obj, 'login', (err, username) => {
            err ? View.displayError(err): View.login(username)
        })
    }

    static logout(obj) {
        Employee.update(obj, 'logout', (err, username) => {
            err ? View.displayError(err): View.logout(username)
        })
    }

    static addPatient(obj) {
        Employee.findOne('status', 1, (err, data) => {
            if (err) {
                View.displayError(err)
            } else {
                if (data.role !== 'dokter') {
                    View.displayError({msg: 'tidak memiliki akses untuk add patient'})
                } else {
                    Patient.create(obj, (err, data) => {
                        if (err) {
                            View.displayError(err)
                        } else {
                            View.displayPatient(data)
                        }
                    })
                }
            }
        })
    }

}

module.exports = ControllerEmployee
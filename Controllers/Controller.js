const Patient = require('../Models/Patient')
const Employee = require('../Models/Employee')
const View = require('../Views/View')
class Controller {

    static register(input) {
        let username = input[0]
        let password = input[1]
        let role = input[2]
        Employee.register(username, password, role, (err, employee, length)=> {
            if(err) {
                View.displayErr(err)
            } else {
                View.successSave(employee, length)
            }
        })
    }

    static login(input) {
        Employee.login(input[0],input[1], (err) => {
            if (err) {
                View.displayErr(err)
            } else {
                View.successLogin(input[0])
            }
        })
    }

    static addPatient(input) {
        Employee.checkDokter((err, data) => {
            if (err) {
                View.displayErr(err)
            } else {
                // console.log(data)
                let dokter = data
                let diagnosa = input.slice(1)
                dokter.addPatient(input[0], diagnosa, (err,data) => {
                    if(err) {
                        View.displayErr(err)
                    } else {
                        // console.log(data)
                        View.successAddPatient(data.length)
                    }
                })
            }
        })
    }
}

module.exports = Controller
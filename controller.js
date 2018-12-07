
const Patient = require('./patient.js')
const Employee = require('./employee.js')
const View = require('./view.js')

class Controller{
    static registerEmployee(data){
        let objEmployee = (new Employee(data[0], data[1], data[2]))
        Employee.register(objEmployee, function(err, fileData){
            if (err){
                View.Error()
            } else{
                View.registrationSuccess(fileData)
            }
        })
    }

    static login(username, password){
        Employee.login(username, password, function(err, data){
            if(err || false){
                View.Display('incorrect username / password')
            } 
            else if(data == false){
                View.Display('incorrect username / password')
            }   else{
                View.loginSuccess(data)
            }
        })
    }

    static addPatient(data){
    let objPatient = (new Patient(data[0], data[1], data[2]))
        Patient.addPatient(objPatient, function(err, fileData){
            if (err){
                View.Error()
            }else {
                Employee.addPatient(function(err, isDoctor){
                    if(err){
                        View.Error()
                    }
                    else if(isDoctor == false){
                        View.Display('tidak memiliki akses untuk add patient')
                    } else{
                        View.addPatientSuccess(fileData)
                    }
                })
            }
                
        })
    }
}

module.exports = Controller
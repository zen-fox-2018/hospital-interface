const View = require('./View.js')
const Employee = require('./Employee.js')
const Patient = require('./Patient')

class Controller {
    
    static registerData(myUsername, myPassword, myPosition){
        Employee.addData(myUsername, myPassword, myPosition, (err) => {
            if(err) {
                View.errWriteData(err)
            } else {
                
                Employee.getData((err,data)=> {
                    if(err) {
                        View.errGetData(err)
                    } else {
                        View.succesWriteData(data)
                    }
                })  
            }
        })
    }
    
    static loginUser(myUsername, myPassword){
        Employee.getLogin(myUsername, myPassword, (err,status) => {
            if(err) {
                View.errLogin(err)
            } else if (status) {
                View.errLogin(status)
            }else {
                View.succesLogin(myUsername)
            }
        }) 
    }

    static addPatient(id, name, diagnosa){
        Employee.cekDokter((isDokter, status) => {
            if(status){
                View.erraddPatient(status)
            } else if(isDokter == true){
                Patient.addPatientHospital(id, name, diagnosa, (err,data) => { //Masih error muncul 2x
                    if(err) View.errWriteData(err)
                    else{
                         
                          View.successAddPatient(data)
                        
                    }
                })
            }
        })
        
    }
}

module.exports = Controller
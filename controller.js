const Employee = require('./Employee.js')
const Patient = require ('./Patient.js')
const View = require('./view.js')

class HospitalController {

    static addPatientByDoctor(patientId, patientName, patientDiagnosis){
        let obj = {
            patientId : patientId,
            patientName : patientName,
            patientDiagnosis : patientDiagnosis
        }
        Patient.addNewPatient(obj, function(err, data){
            if(err){
                View.showErrorMessage(err)
            }
            else {
                
            }
        })
    }

    static loginEmployee(username, password){
        Employee.cekAndLoginEmployee(username, password, function(err, data){
            if(err){
                View.showErrorMessage(err)
            }
            else {
                View.showLoginMessage(data, username)
            }
        })        
    }

    static showAllEmployee(){
        Employee.showAllData(function (err, processedData){
            if(err){
                View.showErrorMessage(err)
            }
            else {
                View.showAllTheEmployee(processedData)
            }
        })        
    }

    static registerNewEmployee(name, username, password, role){
        //mendaftarkan pegawai baru dengan 4 parameter
        let obj = {
            name : name,
            username : username,
            password : password,
            role : role
        }
        // let currentEmployeeData = 
        Employee.registerTheNewEmployee(obj, function(err){
            if(err){
                View.showErrorRegisterMessage(err)
            }
            else {
                Employee.showAllData(function (err, processedData){
                    if(err){
                        callback(err)
                    }
                    else {
                        View.showSuccessRegisterMessage(processedData)
                    }
                })                
            }
        })
    }
}

module.exports = HospitalController
const Employee = require('./employee.js')
const View = require('./view.js')


class Controller {
    static registration (name, position, username, password) {
        Employee.register(name, position, username, password, function(err, data, count){
            if(err) {
                View.registerUnsuccess(err)
            }else{
                View.registerSuccess(data, count)
            }
        })
    }

    static login (username, password) {
        Employee.login(username, password, function(err, data){
            if(err) {
                View.loginUnsuccess(err)
            }else{
                if(data == false){
                    View.loginUnsuccess(data)
                }else{
                    View.loginSuccess(username)
                }
                
            }
        })

    }

    static addPatient (no,name, notes) {
        Employee.rowData(function(err, data){
            if(err){
                callback(err, null)
            }else{
                let findLogin = data
                let isDokter = false
                for(let i = 0; i  < findLogin.length; i++) {
                    if(findLogin[i].isLogin == 'login' && findLogin[i].position == 'dokter'){
                        isDokter = true
                        Employee.addPatient(no,name, notes, function(err, total){
                            if(err) {
                                View.addPatientUnsuccess(err)
                         
                            }else{
            
                                View.addPatientSuccess(total)
                            }
                        }) 
                    }
                }
                if(isDokter == false) {
                    View.addPatientNonDokter()
                }

                
            }
        })

    }
}

module.exports = Controller
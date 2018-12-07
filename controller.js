const Model =  require('./model.js')
const View =  require('./view.js')

class Controller {

    static taskCek () {       
        Model.getData(function(err,data) {
            if(err) {
                View.viewData(err)
              }else {
                View.viewData(data)
              }
            })
        
    }
    static taskRegister(input) {
        Model.addData (input,function(err){
                View.viewData('succes get data')
        })
    }
    static taskLogin(user,password) {
        Model.loginCek(user,password,function(err,data){ 
               console.log(data)
                View.viewLogin(data)          
        })
    }
    static addPatient(input){
        Model.addPatient(input,function(err,data){
                View.viewPatient(data)
        })
    }
}

module.exports =  Controller
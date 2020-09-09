const View = require('./view.js');
const Model = require('./model.js');

class Controller{
  static registerUser(newUser){
    // console.log(newUser);
    Model.Employee.registerUser(newUser,function(err, dataViewRegis){
      if (err) {
        View.showErrorRegis(err);
      } else {
        var lastUser = dataViewRegis[0];
        var totalEmployee = dataViewRegis[1];
        View.showSuccessRegis(lastUser, totalEmployee )
      }
    })
  }

  static login(username,password){
    Model.Employee.login(username,password,function(err, username) {
      if (err) {
        View.showGeneralError(err);
      }
      else {
        View.showSuccessLogin(username);
      }
    })
  }

  static whoIsLogin(){
    Model.Employee.whoIsLogin(function(err, status, username, role){
      if (err) {
        View.showGeneralError(err);
      }
      else {
        View.showWhoIsLogin(status,username,role);
      }
    })
  }

  static addPatient(newPatient){
    Model.Employee.whoIsLogin(function(err, status, username, role){
      if (err) {
        View.showGeneralError(err);
      }
      else {
        if (role === 'dokter') {
          console.log(Model.patient,addPatient);
          Model.patient.addPatient(newPatient, function(err, data){
            if (err) {
              View.showGeneralError(err);
            }
            else {

            }
          });
          //else role dokter
        }else {
          View.showFailAddPatient();
        }
      }
    })
  }


}

module.exports = Controller;

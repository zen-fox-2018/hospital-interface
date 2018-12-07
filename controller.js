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

}

module.exports = Controller;

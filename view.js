class View {
  static showEmployee(data){

  }

  static showErrorRegis(err){
    console.log('Registration Failed!');
    console.log(err);
  }

  static showSuccessRegis(msg,total){
    console.log('save data success ' + msg +'. Total Employee : ' + total);
  }

  static showFailLogin(){
    console.log('username / password wrong');
  };

  static showGeneralError(err){
    console.log('error!');
    console.log(err);
  }

  static showSuccessLogin(username){
    console.log('user '+username+' logged in successfully');
  }

  static showWhoIsLogin(status, username, role){
    if (status === true) {
      console.log(username+' : '+role+' sedang login');
    }
  }

  static showFailAddPatient(){
    console.log('tidak memiliki akses untuk add patients!');
  }
}

module.exports = View

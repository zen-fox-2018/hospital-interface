const Controller = require('./controller.js');

let argv = process.argv;
let command = argv.slice(2);

switch (command[0]) {
  case 'register':
    var newUser = {
      username : command[1],
      password : command[2],
      role : command[3],
      isLogin : false
    }
    Controller.registerUser(newUser);
    break;
  case 'login':
    var username = command[1];
    var password = command[2];
    Controller.login(username, password);
    break;
  case 'whoIsLogin':
    Controller.whoIsLogin();
    break;
  case 'addPatient':
    var joinCommand = '';
    for (var i = 3; i < command.length; i++) {
      joinCommand += command[i] + ' ';
    }
    var newPatient ={
      id : command[1],
      name : command[2],
      diagnose : joinCommand
    }
    Controller.addPatient(newPatient);
    break;
  default:

}

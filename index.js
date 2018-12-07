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
  default:

}

const argv = process.argv.slice(2);
const Controller = require('./controller.js');

switch(argv[0]) {
  case 'register':
    Controller.registration(argv[1], argv[2], argv[3]);
    break;
  case 'login':
    Controller.loginSystem(argv[1], argv[2]);
    break;
  case 'addPatient':
    Controller.patientSystem(argv[1], argv[2], argv.slice(3));
    break;

}
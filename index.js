const HospitalController = require('./Controller/HospitalController.js');

const argv = process.argv.slice(2);

switch (argv[0]) {
  case 'list':
    HospitalController.listData();
    break;
  case 'register':
    HospitalController.register(argv.slice(1));
    break;
  case 'find':
    HospitalController.findData(argv[1]);
    break;
  case 'login':
    HospitalController.login(argv.slice(1), 'login');
    break;
  case 'logout':
    HospitalController.login(argv.slice(1), 'logout');
    break;
  case 'listPatient':
    HospitalController.listPatient();
    break;
  case 'addPatient':
    HospitalController.addPatient(argv.slice(1))
    break;

  default:

}

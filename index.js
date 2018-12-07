const UserController = require('./UserController.js')

const argv = process.argv.slice(2)

switch (argv[0]) {
  case 'showAll' :
    UserController.showAll()
  break;
  case 'register' :
    if (!!argv[1] && !!argv[2] && !!argv[3]) {
      let id = argv[1]
      let pass = argv[2]
      let pos = argv[3]
      UserController.save(id, pass, pos)
    }
    break;
  case 'login' :
    if (!!argv[1] && !!argv[2]){
      let idpass = argv.slice(1)
      UserController.menuLogin(idpass, 'login')
    }
    break;
  case 'logout' :
    UserController.menuLogin(true, 'logout')
    break;
  case 'addPatient':
    let id = argv[1]
    let name = argv[2]
    let diagnosis = argv[3]
    UserController.menuAddPatient(id, name, diagnosis)
    break;
}
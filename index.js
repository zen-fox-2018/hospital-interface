const argv = process.argv.slice(2)
const Controller = require("./controller.js")

switch (argv[0]) {
    case 'Registration': Controller.registration(argv[1],argv[2], argv[3], argv[4])
        break
    case 'Login' : Controller.login(argv[1], argv[2])
        break
    case 'addPatient' : Controller.addPatient(argv[1], argv[2], argv[3])
        break
    default: Controller.showHelp()
        break;
}
const argv = process.argv.slice(2)
const command = argv[0]
const input = argv.slice(1)
const Controller = require('./Controllers/Controller')

switch (command) {
    case "register":
        Controller.register(input)
        break;
    case "login":
        Controller.login(input)
        break;
    case "addPatient":
        Controller.addPatient(input)
        break;
    default:
        break;
}
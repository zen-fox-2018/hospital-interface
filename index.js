const Controller = require("./Controllers/controller");

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "register":
        Controller.register(args[1], args[2], args[3], args[4])
        break;
    case "findAll":
        Controller.findAll()
        break;
    case "login":
        Controller.login(args[1], args[2])
        break;
    case "addpatient":
        Controller.addPatients(args[1], args.slice(2))
        break;
    case "delete":
        Controller.delete(args[1])
        break;
    default:
        break;
}
const Controller = require('./controllers/employeeController.js')

const argv = process.argv.slice(2)

let command = argv[0]
let input = null
switch(command) {
    case 'register' :
        input = {
            username : argv[1],
            password : argv[2],
            role : argv[3]
        }
        Controller.register(input)
    break;

    case 'registerPatient' :
        input = {
            name: argv[1],
            diagnosis: argv[2]
        }
        Controller.registerPatient(input)
    break;
    case 'login' :
        input = {
            username: argv[1],
            password: argv[2]
        }
        Controller.login(input)
    break;

    case 'logout' :
        input = {
            username: argv[1]
        }
        Controller.logout(input)
    break;
    
    case 'findOne' :
        Controller.findOne(argv[1])
    break;
    default:
        Controller.findAll()
    break;
}
const Controller = require('./controller.js')
const command = process.argv.slice(2)

if(command[0] == 'register'){
    Controller.registerEmployee(command.slice(1))
}   
else if(command[0] == 'login'){
    Controller.login(command[1], command[2])
}
else if(command[0] == 'addPatient'){
    Controller.addPatient(command.slice(1))
}


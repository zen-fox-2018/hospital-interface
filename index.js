const argv = process.argv.slice(2)
const Controller = require('./Controller')
// console.log(argv);

switch(argv[0]) {
    case 'list' :
        // Controller.getList()
        break;
    case 'register' : 
        Controller.registerData(argv[1], argv[2], argv[3] )
        break;
    case 'login' :
        Controller.loginUser(argv[1], argv[2])
        break;
    case 'addPatient' :
        
        break;
}
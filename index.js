const argv = process.argv.slice(2)
const Controller = require('./controller.js');

switch (argv[0]) {
    
    case "start" : 

    Controller.taskCek()
    break;

    case "register" :
    let obj = {}
    obj.name = argv[1]
    obj.position = argv[2]
    obj.username = argv[3]
    obj.password = argv[4]

    Controller.taskRegister(obj)
    break;

    case "login" :  
    //let objLogin = {}
    let validasi = argv[1]
    let password = argv[2]
    Controller.taskLogin(validasi,password)
    break;

    case "addPatient" :
     let objAdd = {}
     objAdd.name = argv[2]
     objAdd.id = argv[1]
     objAdd.diagnosis = argv[3]
     Controller.addPatient(objAdd)
     break;
     
    default :
    break;

}

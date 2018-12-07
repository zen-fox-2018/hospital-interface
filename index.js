const argv = process.argv.slice(2)
const HospitalController = require('./controller.js')

switch (argv[0]) {
    case 'showAllEmployee':
        HospitalController.showAllEmployee();
        break;
    case 'register':
        const name = argv[1]
        const username = argv[1]
        const password = argv[2]
        const role = argv[3]
        HospitalController.registerNewEmployee(name, username, password, role);
        break;
    case 'login':
        const entry1 = argv[1]
        const entry2 = argv[2]
        HospitalController.loginEmployee(entry1, entry2);
        break;
    case 'addPatient':
        const patientId = argv[1]
        const patientName = argv[2]
        const patientDiagnosis = argv[3]
        HospitalController.addPatientByDoctor(patientId, patientName, patientDiagnosis)
        break;
    default:
        break;
}
const argv = process.argv.slice(2);
const Controller = require('./controller.js');


switch (argv[0]) {
    case 'registrasi':
        const username = argv[1];
        const password = argv[2];
        const position = argv[3];
        Controller.registration(username, password, position);
        break;
    default:
        break;
}
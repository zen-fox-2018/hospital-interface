const Controller = require("./controller");
const command = process.argv.slice(2);
switch(command[0]) {
    case "register":
    Controller.register(command[1], command[2], command[3]);
    break;
    case "login":
    Controller.login(command[1], command[2]);
    break;
}
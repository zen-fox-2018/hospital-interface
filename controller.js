const Employee = require('./model/employee.js');
const View = require('./view.js');

class Controller {

    static registration(username, password, position) {
        Employee.registration(username, password, position, (err, data) => {
            if (err) {
                View.logError(err);
            } else {
                View.registrationComplete(data);
            }
        });
    }
}

module.exports = Controller;
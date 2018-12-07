const fs = require('fs');
const file = './dataEmployee.json';

class Employee {
    constructor(username, password, position) {
        this.username = username;
        this.password = password;
        this.position = position;
    }

    static readData(callback) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    static formatData(callback) {
        Employee.readData((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                let dataEmployee = [];
                let convert = JSON.parse(data);

                for (let i = 0; i < convert.length; i++) {
                    const dummy = new Employee(convert[i].username, convert[i].password, convert[i].position);
                    dataEmployee.push(dummy);
                }
                callback(null, dataEmployee);
            }
        });
    }

    static writeData(data, callback) {
        fs.writeFile(file, data, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null);
            }
        });
    }

    static registration(username, password, position, callback) {
        Employee.formatData((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                let dataRegister = data;
                let complete = new Employee(username, password, position);
                dataRegister.push(complete);
                dataRegister = JSON.stringify(dataRegister, null, 2);

                Employee.writeData(dataRegister, (err) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null);
                    }
                });
            }
        });
    }
}

module.exports = Employee;
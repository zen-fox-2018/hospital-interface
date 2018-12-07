const fs = require('fs');
class Employee {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name;
    this.username = obj.username;
    this.password = obj.password;
    this.position = obj.position;
    this.loggedIn = obj.loggedIn;

  }

  static readFile(callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }

  static writeFile(data, callback) {
    fs.writeFile('./employee.json', JSON.stringify(data, null, 2),(err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }

  static allEmployee(callback) {
    Employee.readFile((err, employees) => {
      if (err) {
        callback(err, null);
      } else {
        // let allData = [];
        let rawData = JSON.parse(employees);
        rawData = rawData.map( e => new Employee(e));
        callback(null, rawData);
      }
    })
  }

  static register(data, callback) {
    let newData = {
      name : data[0],
      username : data[1],
      password : data[2],
      position : data[3].toLowerCase(),
      isLogin : false
    };

    Employee.allEmployee ((err, employees) => {
      if (err) {
        callback(err, null, null);
      } else {
        let index = employees.findIndex( e => e.username === data[1]);
        if (index === -1) {
          newData.id = employees.length + 1;
          let newEmployee = new Employee(newData);
          employees.push(newEmployee);
          Employee.writeFile(employees, (err) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, employees.length, newEmployee);
            }
          })
        } else {
          callback(null, null, null)
        }
      }
    })
  }

  static findData(search, callback) {
    Employee.allEmployee((err, employees) => {
      if (err) {
        callback(err);
      } else {
        let index = employees.findIndex( e => e.username === search);
        if (index != -1) {
          callback(null, employees[index]);
        } else {
          callback(null, null);
        }
      }
    })
  }

  static login(data, action, callback) {
    Employee.allEmployee((err, employees) => {
      if (err) {
        callback(err);
      } else {
        let index = employees.findIndex( e => e.username === data[0] && e.password === data[1]);
        if (index != -1) {
          let indexLogin = employees.findIndex( e => e.loggedIn === true)
            if (indexLogin != -1 && action === 'login') {
              callback(null, 'isLogin', employees[indexLogin]);
            } else {
              if (action === 'login') {
                employees[index].loggedIn = true;
              } else {
                employees[index].loggedIn = false;
              }
              Employee.writeFile(employees, (err) => {
                if (err) {
                  callback(err, null);
                } else {
                  callback(null, 'success', employees[index]);
                }
              })
            }
        } else {
          callback(null, 'wrong');
        }
      }
    })
  }

  static addPatient(callback) {
    Employee.allEmployee((err, employees) => {
      if (err) {
        callback(err);
      } else {
        let index = employees.findIndex( e => e.loggedIn === true && e.position.toLowerCase() === 'doctor');
        if (index != -1) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }
    })
  }


}

module.exports = Employee;

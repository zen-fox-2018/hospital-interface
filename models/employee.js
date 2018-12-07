const fs = require('fs');

class Employee {

  constructor(name, password, role) {
    this.username = name;
    this.password = password;
    this.role = role;
    this.logIn = false;
  }

  static readFile(callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, JSON.parse(data));
      }
    })
  }

  static writeFile(data, callback) {
    fs.writeFile('./employee.json', data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }

  static staffReg(name, password, role, callback) {
    this.readFile((err, data) => {
      if (err) {
        callback(err, null);
      } else {
        let person = new Employee(name, password, role);
        data.push(person);
        let saveData = JSON.stringify(data, null, 2);
        this.writeFile(saveData, (err) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, JSON.parse(saveData));
          }
        })
      }
    })
  }

  static loginData(username, password, callback) {
    this.readFile((err, data) => {
      if (err) {
        callback(err, null);
      } else {
        for (let i = 0; i < data.length; i++) {
          //only one user can login at a time
          if (data[i].logIn === true) {
            data.issue = 'alreadyLoggedIn';
            callback(null, data);
            return;
          }
          //check if the username and password is correct
          if (data[i].username === username && data[i].password === password) {
            data[i].logIn = true;
            this.writeFile(JSON.stringify(data, null, 2), (err) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data[i]);
              }
            })
            return;     //terminate function
          }
        }
        //if no matching username and password
        data.issue = 'invalidCredentials';
        callback(null, data);
      }
    })
  }

  static logOutAccount(username, password, callback) {
    this.readFile((err, data) => {
      if (err) {
        callback(err, null);
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].username === username && data[i].password === password && data[i].logIn) {
            data[i].logIn = false;
            this.writeFile(JSON.stringify(data, null, 2), (err) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, data[i]);
              }
            })
            return;
          }
        }
        callback(null);
      }
    }) 
  }



}

module.exports = Employee;

// console.log(Employee.staffReg());
// console.log(Employee.writeFile());
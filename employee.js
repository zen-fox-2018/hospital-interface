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
        let isLogin = false;
        let counter = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].logIn === true) {
            counter++;
          }
          if (data[i].username === username && data[i].password === password && counter == 0) {
            var people = data[i];
            data[i].logIn = true;
            isLogin = true;
          }
        }
        if (isLogin) {
          this.writeFile(JSON.stringify(data, null, 2), (err) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, people);
            }
          })
        } else {
          if (counter > 0) {
            callback(null, false);
          } else {
            callback(null);
          }
        }
      }
    })
  }



}

module.exports = Employee;

// console.log(Employee.staffReg());
// console.log(Employee.writeFile());
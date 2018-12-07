const fs = require('fs')
const Patient = require('./patient.js')
const Employee = require('./employee.js')

class User {
  static readFile(callback) {
    fs.readFile('./employee.json', 'utf-8', function (err, employeeData) {
        if (err) throw callback(err, null)
        callback(null, employeeData)
    })
  }

  static readAllFile(username, password, role, callback) {
      User.readFile(function(err, parsingEmployeeData) {
        if (err) {
            callback(err, null)
        } else {
            let dataParser = JSON.parse(parsingEmployeeData)
            let newEmployee = new Employee(username, password, role)
            dataParser.push(newEmployee)
            let stringifyDataParser = JSON.stringify(dataParser, null, 2)
            User.writeFile(stringifyDataParser, (err) => {
                if (err) throw callback(err, null)
                callback(null, dataParser)
            })
        }
      })
  }

  static writeFile(newData, callback) {
    fs.writeFile('./employee.json', newData, (err) => {
        if (err) throw callback(err)
        callback(null)
    })
  }

  static loginModel(username, password, callback) {
    User.readFile((err, loginData) => {
        if (err) callback(err, null)
        let parser = JSON.parse(loginData)
        let ableToLogin = true
        for (let i = 0; i < parser.length; i++) {
            if (parser[i].isLogin === true) {
                ableToLogin = false
            } 
        }
        //kalo abletologin bener
        //kalo salah jadi 
    })
  }
}

module.exports = User
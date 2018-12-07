const fs = require('fs')

class Employee {
  constructor(username, password, position, isLogged = false) {
    this.username = username
    this.password = password
    this.position = position
    this.isLogged = isLogged
  }

  static readFile(callback){
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      (err) ? callback(err, null) : callback(null, data)
    })
  }

  static findAll(callback) {
    Employee.readFile( (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        let employeeData = JSON.parse(data)
        for( let i = 0 ; i < employeeData.length ; i++) {
          let id = employeeData[i].username
          let pass = employeeData[i].password
          let pos = employeeData[i].position
          let isLogged = employeeData[i].isLogged
          employeeData[i] = new Employee(id, pass, pos, isLogged)
        }
        callback(null, employeeData)
      }
    })
  }

  static register (id, pass, pos, callback) {
    Employee.findAll( (err, readData) => {
      if (err) {
        callback(err,null)
      } else {
        readData.push(new Employee(id, pass, pos))
        Employee.writeFile(readData, (err) => {
          (err) ? callback(err, null) : callback(null, readData)
        })
      }
    })
  }

  static login (idpass, log,  callback) {
    Employee.findAll( (err, readData) => {
      if (err) {
        callback(err, null)
      } else {
        let index = null
        if (log === 'login'){
          
          index = readData.findIndex( a => a.username === idpass[0] && a.password === idpass[1])
          if (index !== -1) {
            readData[index].isLogged = true
          } else {
            callback(true, null)
          }
        } else if (log === 'logout') {
          index = readData.findIndex( a => a.isLogged === true)
          if (index !== -1) {
            readData[index].isLogged = false
          } else {
            callback(false, null)
          }
        }

        Employee.writeFile(readData, (err) => {
          (err) ? callback(err, null) : callback(null ,readData[index])
      })
    }
  })
}

  static addPatient(callback) {
    Employee.findAll( (err, readData) => {
      if (err) {
        callback(err, null)
      } else {
        let isThisDoctor = readData.findIndex( (a) => a.isLogged === true)
        
        if (isThisDoctor !== -1) {
          callback(true)
        } else {
          callback(false)
        }
      }
    })
  }

  static writeFile(newData, callback) {
    newData = JSON.stringify(newData, null, 2)
    fs.writeFile('./employee.json', newData , 'utf8', (err) => {
      (err) ? callback(err) : callback(null)
    })
  }
}

var file1 = './employee.json'
var file2 = './patient.json'
module.exports = Employee


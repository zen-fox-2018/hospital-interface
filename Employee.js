const fs = require('fs')
const Patient = require('./Patient.js')

class Employee {
  constructor(id, name, username, password, role, isLogin) {
    this.id = id
    this.name = name
    this.username = username
    this.password = password
    this.role = role
    this.isLogin = isLogin || false
  }

  static readFile(cb) {
    fs.readFile('./employee.json', 'utf8', function(err, employees) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, employees)
      }
    })
  }

  static writeFile(data, cb) {
    fs.writeFile('./employee.json',data, function(err) {
      if (err) {
        cb(err)
      }
      else {
        cb(null)
      }
    })
  }

  static findAll(cb) {
    Employee.readFile(function(err, data) {
      if (err) {
        cb(err)
      }
      else {
        let employees = []
        let dataEmployees = JSON.parse(data)
        for (let i = 0; i < dataEmployees.length; i++) {
          let employee = new Employee (dataEmployees[i].id, dataEmployees[i].name, dataEmployees[i].username, dataEmployees[i].password, dataEmployees[i].role, dataEmployees[i].isLogin)
          employees.push(employee)
        }
        cb(null, employees)
      }
    })
  }

  static findOne(id, cb) {
    Employee.findAll(function(err, dataEmployees) {
      if (err) {
        cb(err)
      }
      else {
        let employees = dataEmployees
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].id === Number(id)) {
            cb(null, employees[i])
          }
          else {
            cb(null, {})
          }
        }
      }
    })
  }

  static create(obj, cb) {
    Employee.findAll(function(err, dataEmployees) {
      if (err) {
        cb(err)
      }
      else {
        let employees = dataEmployees
        let usernameCheck = true
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].username === obj.username) {
            usernameCheck = false
          }
        }
        if (usernameCheck === false) {
          cb(`Username sudah ada, cari lagi yang lain`)
        }
        else {
          let newEmployeeId = employees.length+1
          let newEmployee = new Employee(newEmployeeId, obj.name, obj.username, obj.password, obj.role)
          employees.push(newEmployee)
          Employee.writeFile(JSON.stringify(employees, null, 2), function(err) {
            if (err) {
              cb(err)
            }
            else {
              cb(null)
            }
          })
        }
      }
    })
  }

  static login(obj, cb) {
    Employee.findAll(function(err, dataEmployees) {
      if (err) {
        cb(err)
      }
      else {
        let employees = dataEmployees
        let loginCheck = true
        let passwordCheck = true
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].isLogin === true) {
            loginCheck = false
          }
        }
        if (loginCheck === false) {
          cb(`masih ada yang login silahkan logout dulu`)
        }
        else {
          for (let i = 0; i < employees.length; i++) {
            if (employees[i].username === obj.username) {
              if (employees[i].password === obj.password) {
                employees[i].isLogin = true
                Employee.writeFile(JSON.stringify(employees, null, 2), function(err) {
                  if (err) {
                    cb(err)
                  }
                  else {
                    cb(null)
                  }
                })
              }
              else {
                passwordCheck = false
                cb(`username / password salah`)
              }
            }
          }
        }
      }
    })
  }

  static addPatient(obj, cb) {
    Employee.findAll(function(err, dataEmployees) {
      if (err) {
        cb(err)
      }
      else {
        let employees = dataEmployees
        let loginCheck = false
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].isLogin) {
            loginCheck = true
            if (employees[i].role === "dokter") {
              Patient.create(obj, function(err, data) {
                if (err) {
                  cb(err)
                }
                else {
                  cb(null)
                }
              })
            }
            else {
              cb(`tidak memiliki akses untuk add patient`)
            }
          }
        }
        if (loginCheck === false) {
          cb(`silahkan login terlebih dahulu`)
        }
      }
    })
  }
}

module.exports = Employee
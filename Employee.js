const fs = require('fs')

class Employee {
    constructor(name, username, password, role, status = false) {
        this.name = name
        this.username = username
        this.password = password
        this.role = role
        this.status = status
    }

    static readData(cb) {
        fs.readFile('./employee.json', 'utf8', function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, data)
            }
        })
    }

    static getData(cb) {
        Employee.readData(function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                let parsedData = JSON.parse(data)
                let arrayData = []
                for (let i = 0; i < parsedData.length; i++) {
                    let rawData = new Employee(parsedData[i].name, parsedData[i].username, parsedData[i].password, parsedData[i].role, parsedData[i].status)
                    arrayData.push(rawData)
                }
                cb(null, arrayData)
            }
        })
    }

    static saveData(data, cb) {
        fs.writeFile('employee.json', data, function (err, data) {
            if (err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static addData(name, username, password, role, cb) {
        Employee.getData(function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                let inputData = new Employee(name, username, password, role)
                data.push(inputData)
                let stringifyData = JSON.stringify(data, null, 2)
                Employee.saveData(stringifyData, function (err) {
                    if (err) {
                        cd(err, null)
                    } else {
                        cb(null, data)
                    }
                })
            }
        })
    }

    static logIn(username, password, cb) {
        Employee.getData(function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                let userName = false
                let userLoggedIn = null
                let loggedIn = false
                for (let i = 0; i < data.length; i++) {
                    if (data[i].username == username && data[i].password == password) {
                        userName = true
                        userLoggedIn = data[i]
                    }
                    if (data[i].status == true) {
                        loggedIn = true
                    }
                }
                if (userName && !loggedIn) {
                    cb(null, userLoggedIn.name)
                    userLoggedIn.status = true
                } else {
                    cb(err, false)
                }
                let stringifyData = JSON.stringify(data, null, 2)
                Employee.saveData(stringifyData, function (err) {
                    if (err) {
                        cd(err, null)
                    }
                })
                
            }
        })
    }

}

module.exports = Employee
const fs = require('fs')

class Employee {
    constructor(name, username, password, role, isLogin) {
        this.name = name
        this.username = username
        this.password = password
        this.role = role
        this.isLogin = isLogin
    }

    static cekAndLoginEmployee(username, password, callback){
        this.showAllData(function(err, data){
            if(err){
                callback (err, null)
            }
            else {
                let employee_data = data
                let cekLogin = false
                for ( let i = 0; i < employee_data.length; i++){
                    if(employee_data[i].username === username && employee_data[i].password === password){
                        cekLogin = true
                        employee_data[i].isLogin = true
                    }
                }
                let stringfied = JSON.stringify(employee_data, null, 2)
                Employee.writeFile(stringfied,function(err){
                    if(err){
                        callback(err)
                    }
                    else{
                        callback(null)
                    }
                })
                callback(null, cekLogin)
            }
        })
    }

    static readFile(callback) {
        fs.readFile('employee.json', function (err, data) {
            if (err) {
                callback(err, null)
            }
            else {
                callback(null, data)
            }
        })
    }

    static showAllData(callback) {
        this.readFile(function (err, data) {
            if (err) {
                callback(err, null)
            }
            else {
                let rawData = JSON.parse(data)
                let processedData = []
                for (let i = 0; i < rawData.length; i++) {
                    processedData.push(new Employee(rawData[i].name, rawData[i].username, rawData[i].password, rawData[i].role, rawData[i].isLogin))
                }
                callback(null, processedData)
            }
        })
    }

    static writeFile(data, callback) {
        fs.writeFile('employee.json', data, function (err) {
            if (err) {
                callback(err)
            }
            else {
                callback(null)
            }
        })
    }

    static registerTheNewEmployee(newEmployee, callback) {
        this.showAllData(function (err, data) {
            if (err) {
                callback(err, null)
            }
            else {
                let employeeData = data
                let isLogin = false
                employeeData.push(new Employee(newEmployee.name, newEmployee.username, newEmployee.password, newEmployee.role, isLogin))
                let dataToBeWritted = JSON.stringify(employeeData, null, 2)
                Employee.writeFile(dataToBeWritted, function (err) {
                    if (err) {
                        callback(err)
                    }
                    else {
                        callback(null)
                    }
                })
            }
        })
    }

}

module.exports = Employee
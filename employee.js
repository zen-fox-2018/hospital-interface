const fs = require('fs');
const Patient = require('./Patient.js')

class Employee {
    constructor(name, position, username, password, isLogin) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.isLogin = isLogin
    }

    static readFile (file, callback) {
        fs.readFile(file,'utf8', function(err,data){
            if(err) {
                callback(err, null)
            }else{
                let readData = JSON.parse(data)
                callback(null, readData)
            }
        })
    }

    static patientData (callback) {
        Employee.readFile('./patient.json', function(err,patientData){
            if(err) {
                callback(err, null)
            }else{
                let newData = []
                for(let i = 0; i < patientData.length; i++) {
                    let obj = new Patient (patientData[i].id, patientData[i].name, patientData[i].diagnosis, patientData[i].isLogin)
                    newData.push(obj)
                }
                callback(null, newData)
            }
        })
    }

    static rowData (callback) {
        Employee.readFile('./employee.json', function(err,userData){
            if(err) {
                callback(err, null)
            }else{
                let newData = []
                for(let i = 0; i < userData.length; i++) {
                    let obj = new Employee (userData[i].name, userData[i].position, userData[i].username, userData[i].password, userData[i].isLogin)
                    newData.push(obj)
                }
                callback(null, newData)
            }
        })
    }

    static register(name, position, username, password, callback) {
        Employee.rowData(function(err, data){
            if(err){
                callback(err, null)
            }else{
                let newData = data
                let newUser = new Employee (name, position, username, password, null)
                newData.push(newUser)
                Employee.writeFile('./employee.json',newData,function(err){
                    if(err) {
                        callback(err)
                    }else{
                        callback(null, newUser, newData.length)
                    }
                })
            }
        })
    }

    static writeFile (file, newData, callback) {
        let string = JSON.stringify(newData, null, 2)
        fs.writeFile(file, string, function(err){
            if(err) {
                callback(err)
            }else{
                callback(null)
            }
        })
    }

    static login (username, password, callback) {
        Employee.rowData(function(err, data) {
            if(err) {
                callback(err, null)
            }else{
                let isLogin = false
                for(let i = 0; i < data.length; i++) {
                    if(data[i].username == username && data[i].password == password){
                        isLogin = true
                        data[i].isLogin = 'login'
                    }
                }
                if(isLogin == true) {
                    Employee.writeFile('./employee.json',data,function(err){
                        if(err) {
                            callback(err)
                        }else{
                            callback(null, data)
                        }
                    })
                }else if (isLogin == false){
                    callback(null, false)
                }
            }
        })
    }

    static addPatient (no, name, notes, callback) {
        Employee.patientData(function(err, data){
            if(err){
                callback(err, null)
            }else{
                let newData = data
                let newUser = new Patient (no, name, notes)
                newData.push(newUser)
                Employee.writeFile('./patient.json',newData,function(err){
                    if(err) {
                        callback(err)
                    }else{
                        callback(null,newData.length)
                    }
                })
            }
        })
        
    }


  }

  module.exports = Employee
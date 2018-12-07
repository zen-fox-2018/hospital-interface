const fs = require("fs")

class Employee {
    constructor(username, password, role, isLogin) {
        this.username = username
        this.password = password
        this.role = role
        this.isLogin = isLogin || false
    }

    static readFile(cb) {
        fs.readFile('./employee.json', 'utf8', function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, data)
            }
        })
    }

    static writeFile(data, cb) {
        fs.writeFile('./employee.json', data, 'utf8', function (err) {
            if (err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static showAll(cb) {
        this.readFile(function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                let JSONparse = JSON.parse(data)
                cb(null, JSONparse)
            }
        })
    }

    static register(newData, cb) {
        this.showAll(function (err, fileData) {
            if (err) {
                cb(err, null)
            } else {
                fileData.push(newData)
                let fileDataJSON = JSON.stringify(fileData, null, 2)

                Employee.writeFile(fileDataJSON, function (err) {
                    if (err) {
                        cb(err, null)
                    } else {
                        cb(null, fileData)
                    }
                })
            }
        })
    }

    static login(username, password, cb) {
        this.showAll(function (err, data) {
            if (err) {
                cb(err, null)
            } else {

                let isUsername = false
                let LoginUser= null
                let isLogin = false
                for (let i = 0; i < data.length; i++) {
                    if (data[i].username == username && data[i].password == password) {
                        isUsername = true
                        LoginUser = data[i]
                    }
                    if(data[i].isLogin == true){
                        isLogin = true
                    }
                }
                if (isUsername && !isLogin) {
                    cb(null, LoginUser)
                    LoginUser.isLogin = true
                }   else{
                    cb(err, false)
                }
                Employee.writeFile(data, function (err) {
                    if (err) {
                        cb(err, null)
                    } else {
                        cb(null, JSON.stringify(data, null, 2))
                    }
                })
            }
        })
    }

    static addPatient(cb){
        Employee.showAll(function(err, parseData){
            if(err){
                cb(err, null)
            }   else{
                let isCanAddPatient = false
                for (let i = 0; i < parseData.length; i++) {
                  if (parseData[i].isLogin == true && parseData[i].role == 'dokter') {
                    isCanAddPatient = true
                  }
                }

                cb(null, isCanAddPatient)
            }
        })
    }
}

module.exports = Employee
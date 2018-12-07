const fs = require(`fs`)
const View = require(`../Views/View`)

class Employee {
    constructor(username, password, role) {
        this.username = username
        this.password = password
        this.role = role
        this.islogin = false
    }
    
    static register(username, password, role, cb) {
        this.readFile(function (data) {
            if (data.err == null) {
                if (Employee.findOne(data.data, username)) {
                    cb({
                        err: null,
                        data: true,
                        msg: `Username sudah ada`
                    })
                } else {
                    data.data.push(new Employee(username, password, role))
                    Employee.writeFile(data, cb)
                }
            } else {
                cb(data)
            }
        })
    }

    static readFile(cb) {
        return fs.readFile(`./Database/employee.json`, `utf8`, function (err, data) {
            data = JSON.parse(data)
            if (err) {
                cb({
                    err: err,
                    data: null,
                    msg: `Read Error`
                })
            } else {
                cb({
                    err: null,
                    data: data
                })
            }
        })
    }

    static writeFile(userData, cb) {
        fs.writeFile(`./Database/employee.json`, JSON.stringify(userData.data), function (err, data) {
            if (err) {
                cb({
                    err: err,
                    data: null,
                    msg: `Write Error`
                })
            } else {
                cb({
                    err: null,
                    data: data,
                    msg: `Save data success ${JSON.stringify(userData.data[userData.data.length - 1])} Total Employee: ${userData.data.length}`
                })
            }
        })
    }

    static findOne(userData, username) {
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].username == username) {
                return userData[i]
            }
        }
        return false
    }

    static login(username, password, cb) {
        this.readFile(function (data) {
            if (data.err == null) {
                let findData = Employee.findOne(data.data, username)
                let loginStatus = Employee.findLogin(data.data)
                if (findData) {
                    if (loginStatus == null) {
                        if (findData.password == password) {
                            let resultData = data
                            for (let i = 0; i < resultData.data.length; i++) {
                                if (resultData.data[i].username == username) {
                                    resultData.data[i].islogin = true
                                }
                            }                            
                            Employee.writeFile(resultData, function(params) {})
                            cb({
                                err: null,
                                data: findData,
                                msg: `${findData.username} logged in successfully`
                            })
                        } else {
                            cb({
                                err: true,
                                data: data,
                                msg: `password invalid`
                            })
                        }
                    } else {
                        cb({
                            err: true,
                            data: loginStatus,
                            msg: `Sudah ada yang login`
                        })
                    }
                } else {
                    cb({
                        err: true,
                        data: data,
                        msg: `Username Tidak ada`
                    })
                }
            } else {
                cb(data)
            }
        })
    }

    static addPatient(patientName, disease, cb) {
        this.readFile(function (data) {
            if (data.err == null && Employee.findLogin(data.data)) {
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].islogin == true && data.data[i].role == `dokter`) {
                        
                    }
                }
                
            } else {
                cb(data)
            }
        })
    }

    static findLogin(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].islogin === true) {
                return true
            }
        }
        return null
    }

}

module.exports = Employee
const fs = require(`fs`)
const View = require(`../Views/View`)
const bcrypt = require(`bcryptjs`)

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
                    const saltRounds = 10
                    //TODO:
                    bcrypt.hash(password, saltRounds, function (err, hash) {
                        data.data.push(new Employee(username, hash, role))
                        Employee.writeFile(data, cb)
                    });
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
                        bcrypt.compare(password, findData.password, function (err, res) {
                            if (res == true) {
                                let resultData = data
                                for (let i = 0; i < resultData.data.length; i++) {
                                    if (resultData.data[i].username == username) {
                                        resultData.data[i].islogin = true
                                    }
                                }
                                Employee.writeFile(resultData, function (params) { })
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
                        });

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
                //TODO:
                let check = false
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].islogin == true && data.data[i].role == `dokter`) {
                        check = true
                        cb({
                            err: false,
                            isDoctor: true,
                            data: data.data,
                            msg: null
                        })
                        break;
                    }
                }
                check == false &&
                    cb({
                        err: true,
                        isDoctor: false,
                        data: data.data,
                        msg: `Tidak memiliki akses untuk add patient`
                    })

            } else {
                cb(true)
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

    static logout(username, cb) {
        this.readFile(function (data) {
            if (data.err == null) {
                let dataResult = data
                for (let i = 0; i < dataResult.data.length; i++) {
                    if (dataResult.data[i].username == username) {
                        dataResult.data[i].islogin = false
                        break;
                    }
                }
                Employee.writeFile(dataResult, function (data) {
                    cb({
                        err: null,
                        msg: `Success logout ${username}`
                    })
                })
            } else {
                cb(data)
            }
        })
    }

}

module.exports = Employee
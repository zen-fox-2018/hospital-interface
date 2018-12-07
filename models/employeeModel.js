const fs = require('fs')
const Patient = require('./patientModel.js')

class Employee {
    constructor(username, password, role, login) {
        this.username = username
        this.password = password
        this.role = role
        this.login = login || false
    }

    static readFile(cb) {
        fs.readFile('./models/employee.json', 'utf8', function(err, data) {
            if(err) {
                let obj = {
                    message: 'Error Read File Employee',
                    details: err
                }
                cb(obj, null)
            } else {
                cb(null, JSON.parse(data))
            }
        })
    }

    static writeFile(data, cb) {
        fs.writeFile('./models/employee.json', JSON.stringify(data, null, 2), function(err) {
            if(err) {
                let obj = {
                    message: 'Error Write File Employee',
                    details: err
                }
                cb(obj)
            } else {
                cb(null)
            }
        })
    }

    static findAll(cb) {
        Employee.readFile(function(err, data) {
            if(err) {
                let obj = {
                    message: 'Error Read File Employee on findAll method',
                    details: err
                }
                cb(obj)
            } else {
                let rawData = data
                let displayAll = []
                for(let i = 0; i < rawData.length; i++) {
                    displayAll.push(new Employee(rawData[i].username, rawData[i].password, rawData[i].role, rawData[i].login))
                }
                cb(null, displayAll)
            }
        })
    }

    static findOne(input, cb) {
        Employee.findAll(function(err, data) {
            if(err) {
                cb(err)
            } else {
                let employeeData = data
                for(let i = 0; i < employeeData.length; i++) {
                    if(employeeData[i].username === input) {
                        cb(null, employeeData[i])
                    }
                }
            }
        })
    }

    static register(input, cb) {
        Employee.findAll(function(err, data) {
            if(err) {
                let obj = {
                    message: 'Error Read Data Employee on Register Method',
                    details: err
                }
                cb(obj)
            } else {
                let employeeData = data
                let newEmployee = new Employee(input.username, input.password, input.role)
                employeeData.push(newEmployee)
                Employee.writeFile(employeeData, function(err) {
                    if(err) {
                        let obj = {
                            message: 'Error Write Data Employee on Register Method',
                            details: err
                        }
                        cb(obj)
                    } else {
                        cb(null, employeeData.length)
                    }
                })
            }
        })
    }

    static login(input, cb) {
        Employee.findAll(function(err, data) {
            if(err) {
                let obj = {
                    message: 'Error Read File Employee on login method',
                    details: err
                }
                cb(obj)
            } else {
                let rawData = data

                //set status jika kondisi username dan password sama
                let isLogin = false

                //cek sudah ada yang log in belum
                let checkLogin = false

                for(let i = 0; i < rawData.length; i++) {
                    if(rawData[i].login === true) {
                        checkLogin = true
                    }
                    if(rawData[i].username === input.username && rawData[i].password === input.password) {
                        isLogin = true
                        rawData[i].login = true
                    }
                }
                if(!isLogin) {
                    cb('Wrong Username / Password')
                } else if (checkLogin) {
                    cb('Someone Still logged in...')
                } 
                else {
                    Employee.writeFile(rawData, function(err) {
                        if(err) {
                            let obj = {
                                message: 'Error Write Data Employee on login method',
                                details: err
                            }
                            cb(obj)
                        } else {
                            cb(null, rawData)
                        }
                    })
                }
            }
        })
    }

    static logout(input, cb) {
        Employee.findAll(function(err, data) {
            if(err) {
                let obj = {
                    message: 'Error Read File Employe on logout method',
                    details: err
                }
                cb(obj)
            } else {
                let rawData = data
                let isLogin = true
                for(let i = 0; i < rawData.length; i++) {
                    if(rawData[i].login === true && rawData[i].username === input.username) {
                            isLogin = false
                            rawData[i].login = false
                    }
                }
                if(isLogin) {
                    cb(null)
                } else {
                    Employee.writeFile(rawData, function(err) {
                        if(err) {
                            cb(err)
                        } else {
                            cb(null, rawData)
                        }
                    })
                }
            }
        })
    }

    static registerPatient(input, cb) {
        Employee.findAll(function(err, data) {
            if(err) {
                let obj = {
                    message : 'Error Read File Employee on RegisterPatient method',
                    details : err
                }
                cb(obj)
            } else {
                let employeeData = data
                let isDokter = false
                let isLogin = false
                for(let i = 0; i < employeeData.length; i++) {
                    if(employeeData[i].login === false) {
                        isLogin = false
                    }
                    if(employeeData[i].role === 'dokter' && employeeData[i].login === true) {
                        isDokter = true
                    }
                }

                if(!isDokter) {
                    cb('You are not a doctor')
                } else if(!isLogin) {
                    // console.log(!isLogin)
                    cb('Log in first')
                } else {
                    Patient.readFile(function(err, data) {
                        if(err) {
                            let obj = {
                                message : 'Error Read File Patient on registerPatient method',
                                details : err
                            }
                            cb(obj)
                        } else {
                            let patientData = data
                            if(patientData.length < 1) {
                                var patient = new Patient(0, input.name, input.diagnosis)
                            } else {
                                var patient = new Patient(patientData[patientData.length-1].id + 1, input.name, input.diagnosis)
                            }
                            patientData.push(patient)
                            Patient.writeFile(patientData, function(err) {
                                if(err) {
                                    let obj = {
                                        message : 'Error Write File Patient on registerPatient method',
                                        details : err
                                    }
                                    cb(obj)
                                } else {
                                    cb(null, patientData.length)
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

module.exports = Employee

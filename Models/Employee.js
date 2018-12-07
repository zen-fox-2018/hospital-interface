const Model = require("./Model")
const Patient = require('../Models/Patient')
class Employee extends Model{
    constructor(username, password, role, login) {
        super()
        this._username = username;
        this._password = password;
        this._role = role;
        this._login = login || false
    }


    get username() {
        return this._username
    }

    static save(data, callback) {
        super.save("Employee.json", data, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    static getData(callback) {
        super.getData("./Employee.json", (err, data)=> {
            if (err) {
                callback(err)
            } else {
                callback(null,data)
            }
        })
    }

    static register(username, password, role, callback) {
        if(typeof callback !== "function") {
            return `parameter callback harus berupa function`
        }
        Employee.findAll((err,data) => {
            if (err) {
                callback(err, null)
            } else {
                let employee = data
                let check = Employee.checkusername(username, employee)
                if (!check) {
                    callback({msg:`username sudah terpakai silahkan masukan username lain`},null)
                } else {
                    let person = new Employee(username, password, role )
                    employee.push(person)
                    Employee.save(employee, (err) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            let length = employee.length
                            callback(null, person, length)
                        }
                    })
                }
                
            }
        })
        
    }

    static checkusername (username ,data) {
        let isunique = true
        if (data.length === 0 ) {
            return true
        } else {
            data.forEach(person => {
                if (person.username === username) {
                    isunique = false
                }
            })
        }
        return isunique
    }

    static findAll (callback) {
        Employee.getData((err,data) => {
            if (err) {
                callback(err)
            } else {
                let rawData = JSON.parse(data)
                let people = []
                rawData.forEach(element => {
                    let employee = new Employee(element._username, element._password, element._role, element._login)
                    people.push(employee)
                });
                callback(null, people)
            }
        })
    }
    static findOne(field , value, callback) {
        Employee.findAll((err, data) =>{
            if (err) {
                callback(err)
            } else {
                let user = undefined
                for ( let i = 0 ; i < data.length; i++) {
                    if (data[i][field] === value) {
                        user = data[i]
                    }
                }
                callback(null, user)
            }
        })
    }
    static login(username, password, callback) {
        Employee.findOne("_login", true, (err,data) => {
            if (err) {
                callback(err)    
            } else {
                if (data !== undefined ) {
                    callback(`yang boleh login hanya satu orang `)
                } else {
                    Employee.findAll((err, data) => {
                        if (err) {
                            callback(err)
                        } else {
                            let userData = data
                            let check = false
                            userData.forEach(person => {
                                if (person._username === username && person._password === password) {
                                    person._login = true
                                    check = true
                                } 
                            })
                            if (check) {
                                Employee.save(userData, (err) => {
                                    if (err) {
                                        callback(err)
                                    } else {
                                        callback(null)
                                    }
                                })
                            } else {
                                callback(`password atau username salah`)
                            }
                        }
                    })

                }
            }
        })

    }

    addPatient( name, diagnosa, callback) {
        let pasien = new Patient( name, diagnosa)
        Patient.getData((err, data) => {
            if (err) {
                callback(err)
            } else {
                let Patients = JSON.parse(data)
                if(Patients.length === 0) {
                    pasien._id = 1 
                } else {
                    pasien._id = Patients[Patients.length-1]._id + 1
                }
                Patients.push(pasien)
                Patient.save(Patients,(err) => {
                    if(err) {
                        callback(err)
                    } else {
                        callback(null,Patients)
                    }
                })
            }
        })
    }

    static checkDokter (callback) {
        Employee.findOne("_login", true, (err, data)=> {
            if (err) {
                callback(err)
            } else {
                if(data === undefined) {
                    callback(`harus login terlebih dahulu`)
                } else if (data._role !== "dokter") {
                    callback(`anda tidak punya akses`)
                } else {
                  callback(null, data)
                }
            }
        })
    }
    
}

module.exports = Employee



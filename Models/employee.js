const fs = require("fs");
const Patients = require("./patients")

class Employee {
    constructor(id, name, position, username, password) {
        this._id = id
        this._name = name;
        this._position = position;
        this._username = username;
        this._password = password;
        this.isLogin = false
    }

    get id() {
        return this._id
    }

    set id(input) {
        this._id = input;
    }

    get username() {
        return this._username;
    }

    set username(input) {
        this._username = input
    }

    get password() {
        return this._password;
    }

    set password(input) {
        this._password = input
    }

    static readData(callback) {
        fs.readFile("./package.json", "utf8", function(err, data) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, JSON.parse(data));
            }
        })
    }

    static writeFile(data, callback) {
        fs.writeFile("./package.json", JSON.stringify(data, null, 2), function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    // find all masih belum jalan
    static findAll(callback){
        Employee.readData(function(err, data) {
            if(err) {
                callback(err, null)
            } else {
                let result = [];
                for(let i = 0; i < data.length; i++) {
                    result.push(new Employee(data[i]._id, data[i]._name, data[i]._position, data[i]._username, data[i]._password))
                }
                callback(null, result)
            }
        })
    }

    static findOne(input, callback) {
        Employee.readData(function(err, data) {
            if(err) {
                callback(err, null);
            } else {
                for(let i = 0; i < data.length; i++) {
                    if(data[i]._id === input) {
                        callback(null, data[i]);
                    }
                }
            }
        })
    }

    static registerEmployee(name, position, username, password, callback) {
        Employee.readData(function(err, data) {
            if(err) {
                callback(err, null);
            } else {
                let newData = new Employee(name, position, username, password);
                if(data.length === 0) {
                    newData._id = 1;
                } else {
                    newData._id = data[data.length - 1]._id + 1;
                }
                data.push(newData);

                Employee.writeFile(data, function(err) {
                    if(err) {
                        callback(err);
                    } else {
                        callback(data);
                    }
                })
            }
        })
    }

    static logIn(username, password, callback) {
        Employee.readData(function(err, data) {
            if(err) {
                callback(err);
            } else {
                let check = false
                data.forEach(element => {
                    if(username === element._username && password === element._password) {
                        element.isLogin = true;
                        check = true;
                    }
                });
                
                if(!check){
                    callback("Wrong username/password!")
                } else {
                    Employee.writeFile(data, function(err) {
                        if(err) {
                            callback(err);
                        } else {
                            callback(null);
                        }
                    })
                }
            }
        })
    }

    static addPatients(name, diagnosis, callback) {
        Employee.readData(function(err, data) {
            if(err) {
                callback(err);
            } else {
                let check = false;
                data.map(element => {
                    if(element.isLogin === true && element._position === "dokter") {
                        check = true;
                        Patients.readFilePatients(function(err, patientData) {
                            
                            if(err) {
                                callback(err)
                            } else {

                                let newPatient = new Patients(name, diagnosis);
        
                                if(patientData.length === 0) {
                                    newPatient._id = 1;
                                } else {
                                    newPatient._id = patientData[patientData.length - 1] + 1;
                                }

                                patientData.push(newPatient)
        
                                Patients.writeFilePatients(patientData, function(err) {
                                    if(err) {
                                        callback(err)
                                    } else {
                                        callback(patientData)
                                    }
                                })
                            }
                        })
                    }
                })
                if(!check) {
                    callback("Tidak memiliki akses untuk add patients!")
                }
            }
        })
    }

    // static deleteUser(input) {
    //     Employee.findAll(function(err, data) {
    //         console.log()
    //     })
    // }
}

module.exports = Employee
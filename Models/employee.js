const fs = require("fs");
const Patients = require("./patients")

class Employee {
    constructor(id, name, position, username, password) {
        this._id = id
        this._name = name;
        this._position = position;
        this._username = username;
        this._password = password;
        this._isLogin = false
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

    get isLogin() {
        return this._isLogin
    }

    set isLogin(input) {
        this._isLogin = input
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
        Employee.findAll(function(err, data) {
            if(err) {
                callback(err, null);
            } else {
                for(let i = 0; i < data.length; i++) {
                    if(data[i]._id === input) {
                        return data[i]
                    }
                }
            }
        })
    }

    static registerEmployee(registerObj, callback) {
        Employee.findAll(function(err, data) {

            if(err) {
                callback(err, null);
            } else {

                let id = null;
                if(data.length === 0) {
                    id = 1;
                } else {
                    id = data[data.length - 1]._id + 1;
                }

                let newData = new Employee(id, registerObj.name, registerObj.position, registerObj.username, registerObj.password);

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
        Employee.findAll(function(err, data) {
            if(err) {
                callback(err);
            } else {
                let check = false
                data.forEach(element => {
                    if(username === element._username && password === element._password) {
                        element._isLogin = true;
                        check = true;
                    }
                });

                if(check === false) {
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
        Employee.findAll(function(err, data) {
            if(err) {
                callback(err);
            } else {
                let check = false;
                data.map(element => {
                    if(element._isLogin === true && element._position === "dokter") {
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
                                        callback(null)
                                    }
                                })
                            }
                        })
                    }
                })
                if(check === false) {
                    callback("Tidak memiliki akses untuk add patients!")
                }
            }
        })
    }

    static logOutEmployee(callback) {
        Employee.findAll(function(err, data) {
            if(err) {
                callback(err)
            } else {

                let check = false
                for(let i = 0; i < data.length; i++) {
                    if(data[i]._isLogin === true) {
                        data[i]._isLogin = false;
                        check = true
                    }
                }
                Employee.writeFile(data, function(err){
                    if(err) {
                        callback(err)
                    } else {
                        callback(null)
                    }
                })
            }
        })
    }
}

module.exports = Employee
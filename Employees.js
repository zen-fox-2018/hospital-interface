const fs = require("fs")
class Employees {
    constructor(username, password, position) {
      this.username = username
      this.password = password
      this.position = position
      this.status = 'off'
    }
    static register(username, password, position, callback) {
        Employees.employeesList(function(err, data) {
            if (err) {
                callback(err, null)
            } else {
                let newData = new Employees(username, password, position)
                data.push(newData)
                let dataInStr = JSON.stringify(data, null, 2)
                Employees.writeFile("./employees.json", dataInStr, function(err) {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null,data)
                    }
                })
            }
        }) 
    }

    static logIn(username, password, callback) {
        Employees.employeesList(function(err, data) {
            if (err) {
                callback(err, null);
            } else {
                let isAllOff = true;
                for (let i = 0; i <= data.length-1; i++) {
                    if (data[i].status === 'on') {
                        isAllOff = false;
                    }
                }
                if (isAllOff === false) {
                    for (let i = 0; i <= data.length-1; i++) {
                        var isCorrect = false;
                        if (data[i].username == username && data[i].password == password) {
                            isCorrect = true;
                            var name =  data[i].username;
                            data[i].status = 'on'
                        }
                    }
                    if (isCorrect === false) {
                        callback(null, false)
                    } else {
                        let newData = JSON.stringify(data, null, 2)
                        Employees.writeFile("./employees.json", newData, function(err) {
                                if (err) {
                                    callback(err)
                                } else {
                                    callback(null, name)
                                }
                            })                    
                    }
                } else {
                    callback(null, undefined)
                }
                
            }
        })
    }

    static employeesList(callback) {
        this.readFile(function(err, data) {
            if (err) {
                callback(err, null)
            } else {
                let convertData = JSON.parse(data);
                let dataInObjClass = []
                for (let i = 0; i <= convertData.length-1; i++) {
                    let employeesData = new Employees(convertData[i].username, convertData[i].password, convertData[i].position);
                    dataInObjClass.push(employeesData)
                }
                callback(null, dataInObjClass)
            }
        })
    }

    static readFile(callback) {
        fs.readFile("./employees.json", "utf-8", function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    }

    static writeFile(source, newData, callback) {
        fs.writeFile(source, newData, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

  }
  module.exports = Employees
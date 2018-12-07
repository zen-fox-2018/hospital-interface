const fs = require('fs')
const Patient = require('./Patient')
class Employee {
    constructor(obj) {
      this.name = obj['name']
      this.position = obj['position']
      this.username = obj['username']
      this.password = obj['password']
      this.isLogin = obj['isLogin']
    }
    
    static readData(callback) {
        fs.readFile('./employee.json', 'utf8', (err,data)=> {
            if(err){
                callback(err,null)
            } else {
                callback(null,data)
            }
        })
    }

    static getData(callback) {
        Employee.readData((err,data) => {
            if(err) {
                callback(err,null)
            } else {
                let dataParse = JSON.parse(data)
                let result =[]
                
                // console.log(typeof dataParse);
                for(let i =0 ;i < dataParse.length ; i++) {
                        result.push(new Employee(dataParse[i]))
                    
                }
                
               callback(null, result)
            }
        })
    }


    static addData(myUsername, myPassword, myPosition, callback) {
        Employee.getData((err,data) => {
            if(err){
                callback(err,null)
            } else {
                let newUser = new Employee ({
                    name : myUsername.toUpperCase(),
                    position : myPosition,
                    username : myUsername,
                    password : myPassword,
                    isLogin : false
                })
                data.push(newUser)
                // console.log(data,'--------------------------')
                Employee.writeData(JSON.stringify(data, null, 2), (err) => {
                    if(err) callback(err)
                    else callback(null)
                })
            }
        })
    }

    static writeData(data, callback) {
        fs.writeFile('./employee.json', data, (err) => {
            if(err) callback(err)
            else callback(null)
        })
    }

    
    static getLogin(myUsername, myPassword, callback) {
        Employee.getData((err,data) => {
            if(err) callback(err, null ,null)
            else {
                let checkLogin = false
                let checkDoubleLogin = false
                for(let i = 0; i < data.length; i++) {
                    if(data[i].isLogin == false){
                        if(myUsername === data[i].username && myPassword === data[i].password ) {
                            data[i].isLogin = true
                            checkLogin = true
                            // console.log("masuk");
                        } 
                    } else {
                        checkDoubleLogin = true
                    } 
                }
                if(checkDoubleLogin) {
                    callback( null,  "You are already logging in")
                } else if(!checkLogin){
                    callback(null, 'username or password wrong')
                } else {
                // console.log(data);
                    Employee.writeData(JSON.stringify(data,null,2), (err) => {
                        if(err) callback(err)
                        else callback(null)
                    })
                }
            }
        })
    }
  }
  
  module.exports = Employee
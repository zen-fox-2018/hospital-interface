const Model = require('./Model') 
const dataEmp = './database/employee.json'

const Patient = require('./Patient')
const pathPatient = './database/patient.json'

class Employee {
  constructor(uname, pass, role) {
    this.username = uname
    this.password = pass
    this.role = role
    this.login = false 
  }

  static register(option, cb) {
    let uname = option[0]
    let pass = option[1]
    let role = option[2]
    let newEmp = new Employee(uname, pass, role)

    Model.getData(dataEmp, function(err, data) {
      if(!err) {
        let cek = Employee.checkUname(uname, data)
        if(cek == true) {
          Model.add(dataEmp, newEmp, function(err, data) {
            cb(err, data, JSON.stringify(newEmp))
          })
        } else {
          cb(err, null, null)
        }
      } else {
        cb(err, null, null)
      }
    })
    
  }

  static login(option, cb) {
    let uname = option[0]
    let pass = option[1]

    Model.getData(dataEmp, function(err, data) {
      if(!err) {
        let isLogin = false
        let cekLogin = false
        let user;
        for (let i = 0; i < data.length; i++) {
          if (data[i].login == true) {
            cekLogin = true
          } 
          if (data[i].username == uname && data[i].password == pass) {
            isLogin = true
            user = data[i]
            data[i].login = true
          }
        }

        if (cekLogin) {
          cb(`Somebody login already!`)
        } else {
          if(!isLogin) {
            cb(`Username / password wrong`)
          } else {
            Model.save(dataEmp, data, (err) => {
              if(err) {
                cb(err)
              } else {
                cb(null, user)
              }
            })
          }
        }
      } else {
        cb(err)
      }
    })
  }

  static addpatient(option, cb){
    let name = option[0]
    let diag = option.slice(1)

    Model.getData(dataEmp, (err,data) => {
      if(err) {
        cb(err)
      } else {
        let dokter = false 
        let islogin = false
        for (let i = 0; i < data.length; i++) {
          if(data[i].login == true) {
            islogin = true;
            if (data[i].role == 'dokter') {
              dokter = true
              break
            }     
          }  
        }
        if (islogin == false) {
          cb(`Please login first`)
        } else {
          if(!dokter) {
            cb(`Only doctor have permission to add patient`)
          } else {
            Model.getData(pathPatient, (err, data) => {
              if(err) {
                cb(err)
              } else {
                let idAuto = 1
                if (data.length !== 0) {
                  idAuto = data[data.length - 1].id + 1
                } 
                let newPatient = new Patient(idAuto, name , diag)
                data.push(newPatient)
                Model.save(pathPatient, data, function(err) {
                  cb(err, data)
                })
              }
            })
    
          }
        }
      }
    })

    
  }

  static logout(option, cb) {

    Model.getData(dataEmp, (err, data) => {
      if(err) {
        cb(err)
      } else {
        let isLogin = false
        let user ;
        let ada = true
        for (let i = 0; i < data.length; i++) {
          if(data[i].username == option) {
            if(data[i].login == true) {
              isLogin = true
              data[i].login = false
              user = data[i]
              break;
            }
          } else {
            ada = false
          }
        }
        if(ada == false) {
          cb(null, `Username not found`)
        } else {
          if(!isLogin) {
            cb(null, `You didn't login`)
          } else {
            Model.save(dataEmp , data, (err) => {
              if(err) {
                cb(err)
              } else {
                cb(null , user)
              }
            })
          }
        }
      }
    })
  }

  static checkUname(uname, data) {
    if(data.length == 0) {
      return true
    } else {
      let index = data.findIndex((user) => user.username === uname)
      if (index == -1) {
        return true
      } else {
        return false
      }
    }
  }
}

module.exports = Employee
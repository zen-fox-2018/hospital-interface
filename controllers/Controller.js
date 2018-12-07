const View = require('../views/View')
const Employee = require('../models/Employee')

class Controller {
  static execute(input) {
    let command = input[0] 
    let option = input.slice(1)
    switch (command) {
      case 'register': Controller.register(option); break;
      case 'login': Controller.login(option); break;
      case 'logout': Controller.logout(option); break;
      case 'addPatient': Controller.addPatient(option); break;
      default: View.help() ;break;
    }
  }

  static register(option) {
    if (option.length !== 3) {
      View.display(`Please input correct data to proceed : <username> <password> <role>`)
    } else {
      Employee.register(option, function(err, data, single) {
        if (err) {
          View.display(`Error in registering new Employee`, err)
        } else {
          if(data) {
            View.display(`save data success : ${single}.\nTotal Employee: ${data.length}`)
          } else {
            View.display(`Username already exist! Please choose other username`)
          }
        }
      })
    }

  }

  static login(option) {
    Employee.login(option, function(err, data) {
      if (data) {
        View.display(`User ${data.username} logged in successfully!`)
      } else {
        View.display(`Error login user :`, err)
      }
    })
  }

  static addPatient(option) {
    Employee.addpatient(option, (err, data)=> {
      if(data) {
        View.display(`Data patient successfully added. Total data patient : `, data.length)
        
      } else {
        View.display(`Error add patient :` , err)
      }
    })
  }

  static logout(option) {
    Employee.logout(option , (err, data) => {
      if(err) {
        View.display(`Error :`, err)
      } else {
          View.display(`Success logout!`, data.username)
      }
    })
  }

  static findOne (field , value, data) {
    if(data.length == 0) {
      return true
    } else {
      let index = data.findIndex((user) => user[field] === value)
      if (index == -1) {
        return true
      } else {
        return false
      }
    }
  }
}

module.exports = Controller
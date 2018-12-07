const fs = require('fs');


class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
  }
}

class Employee {
  constructor(data) {
    this.data = data;
  }

  static readFileJSON(callback) {
    fs.readFile('./employee.json', 'utf8', function(err, data){
      if (err) {
        callback(err,null);
      }
      else{
        var dataParsed = JSON.parse(data);
        callback(null,dataParsed);
      }
    })
  }

  static writeFileJSON(dataToBeWritten, callback){
    fs.writeFile('./employee.json', dataToBeWritten, 'utf8', function(err) {
      if (err) {
        callback(err)
      }
      else {
        callback(null)
      }
    })
  }

  static login(username,password,callback){
    Employee.readFileJSON(function(err, data) {
      if (err) {
        callback(err, null);
      }
      else {
        var userLogin = '';
        var dataMatch = false;
        for (var i = 0; i < data.length; i++) {
          if (data[i].username === username && data[i].password === password) {
            data[i].isLogin = true;
            dataMatch = true;
            userLogin = data[i].username;
          }
        }
        if (dataMatch === true) {
          data = JSON.stringify(data);
          Employee.writeFileJSON(data, function(err) {
            if (err) {
              callback(err, null);
            }
          })
          callback(null,username);
        }
        else {
          callback(null,username);
        }
      }
    })
  }


  static registerUser(newUser,callback){
    Employee.readFileJSON(function(err, data) {
      if (err) {
        callback(err,null)
      }
      else {
        var oldList = new Employee(data);
        oldList.data[oldList.data.length] = newUser;
        var total = oldList.data.length;
        var dataViewRegis = [JSON.stringify(newUser), total]
        var newList = JSON.stringify(oldList.data);
        Employee.writeFileJSON(newList,function (err) {
          if (err) {
            callback(err);
          }
        })
        callback(null, dataViewRegis)
      }
    })
  }
}



module.exports = {Patient, Employee};

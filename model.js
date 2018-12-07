const fs =  require("fs")


class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(input) {
    this.name = input.name
    this.position = input.position
    this.username = input.username
    this.password = input.password
    this.islogin = false
  }
}

class Model {
  
  static readFile (callback) {
    fs.readFile ('./employee.json', 'utf-8',function(err, data) {
      if(err) {
        callback(err, null)
      }else {
        callback(null,data)
      }
    })
  }
  
  static getData (callback) {
  
    Model.readFile(function(err,data){
      if(err) {
        callback(err, null)
      }else {
        let rawData = JSON.parse(data)
        
        let result = []
        for(let i = 0; i < rawData.length; i++) {
          result.push(new Employee(rawData[i]))
        }
        callback(null,rawData)
      }
    })

  }

  static addData (input,callback) {
    Model.getData(function(err,data){
      if(err){
        callback(err)
      }else {
        let rawData = data
        rawData.push(new Employee(input))
        Model.writeFile(JSON.stringify(rawData),function(err) {
          if(err) {
            callback(err)
          }else {
            callback(null)
          }
        })
      }
    })
  }

  static writeFile (input,callback) {
   
      fs.writeFile('./employee.json',input,(function(err){
        if (err) {
          callback (err)
        }
        else {
          callback(null)
        }
      }))  
    }

    static loginCek (user,password,callback) {
      Model.getData(function(err,data){
        if(err) {
          callback(err)
        }else {
          let validasi = false
          for(let i = 0; i < data.length; i ++){
           
              if(data[i].username === user && data[i].password === password){
                data[i].islogin =  true
              }
                      
          } 
          if(validasi) {
            Model.writeFile(data,function(err){
              if(err){
                callback(err)
              }else{
                callback(null)
              }
            })
            callback(null,input.name)
          }
        }
      })
    }
}


module.exports = Model

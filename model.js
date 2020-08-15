const fs =  require("fs")


class Patient {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.diagnosis = obj.diagnosis
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

  static readPatient(callback) {
    fs.readFile('./patient.json','utf-8',function(err,data){
      if(err){
        callback(err,null)
      }else {
        callback(null,data)
      }
    })
  }

  static getDataPatient (callback) {
    
    Model.readPatient(function(err,data){
      if(err) {
        callback(err, null)
      }else {
        let rawData = JSON.parse(data)     
        let result = []
        for(let i = 0; i < rawData.length; i++) {
          result.push(new Patient(rawData[i]))
        }
        callback(null,result)
      }
    })

  }
  static writeFilePatient (input,callback) {
   
    fs.writeFile('./patient.json',input,(function(err){
      if (err) {
        callback (err)
      }
      else {
        callback(null)
      }
    }))  
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
          let index = ''
          for(let i = 0; i < data.length; i ++){
              if(data[i].username == user && data[i].password == password){
                data[i].islogin =  true
                validasi =  true
                index = i         
              }                     
          }        
          if(validasi) {
            Model.writeFile(JSON.stringify(data),function(err){
              if(err){
                callback(err)
              }else{
                callback(null,data[index].name)
              }
            })
          }
        }
      })
    }

    static addPatient(input,callback) {
      Model.getDataPatient(function(err,data){
        if(err){
          callback(err)
        }else {
        //  console.log(data)
          let rawData = data
          Model.getData(function(err,data){
            for(let i = 0; i < data.length; i++){
              if(data[i].position ==  'dokter' && data[i].islogin ==  true){
                  rawData.push(new Patient(input))
                  Model.writeFilePatient(JSON.stringify(rawData),function(err) {
                      if(err) {
                        callback(err)
                      }else {
                        callback(null)
                      }

                    })
                  
                  }                
                }
                callback(null,rawData.length)
          })
        }
      })
    }
}


module.exports = Model

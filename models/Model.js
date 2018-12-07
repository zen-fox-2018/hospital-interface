const fs = require('fs')
class Model {

  static getData(path, cb) {
    fs.readFile(path , function(err, data) {
      let hasil = JSON.parse(data)
      cb(err, hasil)
    })
  
  }

  static save(path, data, cb){
    let string = JSON.stringify(data, null ,2)
    fs.writeFile(path, string, function(err) {
      cb(err)
    })
    
  }

  static add(path, newData, cb) {
    Model.getData(path , function(err, data) {
      if (!err) {
        data.push(newData)
        Model.save(path, data, function(err) {
          
          cb(err, data)
        })
      } else {
        cb(err)
      }
    })
  }
}
module.exports = Model
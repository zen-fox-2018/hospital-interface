const fs = require('fs')
class Model {

    static getData(path, callback) {
        if(typeof callback !== "function") {
            return `parameter callback harus berupa function`
        }
        fs.readFile(path,"utf8",(err,data)=> {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    static save(path, data, callback) {
        if(typeof callback !== "function") {
            return `parameter callback harus berupa function`
        }
        fs.writeFile(path,JSON.stringify(data, null, 2),(err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

}

module.exports = Model
const fs = require('fs')

class Patient {
    constructor(id, name, diagnosis) {
        this.id = id
        this.name = name
        this.diagnosis = diagnosis
    }

    static readFile(cb) {
        fs.readFile('./models/patient.json', 'utf8', function(err, data) {
            if(err) {
                let obj = {
                    message: 'Error Read File Patient',
                    details: err
                }
                cb(obj)
            } else {
                cb(null, JSON.parse(data))
            }
        })
    }

    static writeFile(data, cb) {
        fs.writeFile('./models/patient.json', JSON.stringify(data, null, 2), function(err) {
            if(err) {
                let obj = {
                    message : 'Error Write File Patient',
                    details : err
                }
                cb(err)
            } else {
                cb(null)
            }
        })
    }
}

module.exports = Patient
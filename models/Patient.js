const fs = require('fs')

class Patient {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.diagnosis = obj.diagnosis
    }

    static readFile(cb) {
        fs.readFile('./patient.json', (err, data) => {
            err ? cb({msg: 'err readFile', err: err}): cb(null, data)
        })
    }

    static save(data, cb) {
        fs.writeFile('./patient.json', JSON.stringify(data, null, 2), function(err) {
            if (err) {
                cb({msg: 'err writeData', err: err})
            } else {
                cb(null)
            }
        })
    }

    static findAll(cb) {
        this.readFile((err, data) => {
            if (err) {
                cb(err)
            } else {
                data = JSON.parse(data)
                let result = data.map(obj => {
                    return new Patient(obj)    
                });
                cb(null, result)
            }
        })
    }

    static create(newObj, cb) {
        this.findAll((err, data) => {
            if (err) {
                cb({msg: 'err findAll', err: err})
            } else {
                newObj.id = data.length+1
                data.push(new Patient(newObj))
                this.save(data, (err) => {
                    if (err) {
                        cb(err)
                    } else {
                        cb(null, data.length)
                    }
                })
            }
        })
    }

}

module.exports = Patient
const fs = require("fs")

class Patients {
    constructor(name, diagnosis) {
        this._id = 0;
        this._name = name;
        this._diagnosis = diagnosis
    }

    set id(input) {
        this._id = input
    }

    get id() {
        return this._id
    }

    static readFilePatients(callback) {
        fs.readFile("./patients.json", "utf8", function(err, data) {
            if(err) {
                callback(err, null)
            } else {
                callback(null, JSON.parse(data))
            }
        })
    }

    static writeFilePatients(data, callback) {
        fs.writeFile("./patients.json", JSON.stringify(data, null, 2), function(err, data) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
}

module.exports = Patients
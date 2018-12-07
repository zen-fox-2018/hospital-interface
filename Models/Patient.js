const fs = require(`fs`)

class Patient {
    constructor(name, disease) {
        this.name = name
        this.disease = disease
    }

    static readFile(cb) {
        fs.readFile(`./Database/patient.json`, `utf8`, function(err, data) {
            
        })
    }
}

module.exports = Patient
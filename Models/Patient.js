const fs = require(`fs`)

class Patient {
    constructor(id, name, disease) {
        this.id = id
        this.name = name
        this.disease = disease
    }

    static readFile(cb) {
        return fs.readFile(`./Database/patient.json`, `utf8`, function (err, data) {
            data = JSON.parse(data)
            if (err) {
                cb({
                    err: err,
                    data: null,
                    msg: `Read Error`
                })
            } else {
                cb({
                    err: null,
                    data: data
                })
            }
        })
    }

    static writeFile(userData, cb) {
        fs.writeFile(`./Database/patient.json`, JSON.stringify(userData.data, null, 2), function (err, data) {
            if (err) {
                cb({
                    err: err,
                    data: null,
                    msg: `Write Error`
                })
            } else {
                cb({
                    err: null,
                    data: data,
                    msg: `Save data success ${JSON.stringify(userData.data[userData.data.length - 1])} Total Patient: ${userData.data.length}`
                })
            }
        })
    }

    static addPatient(patientName, patientDisease, cb) {
        this.readFile(function (data) {
            let dataResult = data
            if (dataResult.err == null) {
                dataResult.data.push(
                    new Patient(dataResult.data.length + 1, patientName, patientDisease)
                )
                Patient.writeFile(dataResult, function (data) {
                    data.err == null ?
                        cb(data) :
                        cb(data)
                })
            } else {
                cb(data)
            }
        })
    }
}

module.exports = Patient
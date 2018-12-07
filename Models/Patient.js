const Model = require('./Model')
class Patient extends Model {
    constructor(name, diagnosa, id) {
        super()
        this._id = id || null;
        this._name = name;
        this._diagnosa = diagnosa
    }

    static getData(callback) {
        super.getData("./Patients.json", (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    static save(newdata, callback) {
        super.save("./Patients.json", newdata, (err)=>{
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
 }

module.exports = Patient
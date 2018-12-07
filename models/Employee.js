const fs = require('fs')
const bcrypt = require('bcryptjs')

class Employee {
    constructor(obj) {
        this.id = obj.id
        this.username = obj.username
        this.password = obj.password
        this.role = obj.role
        this.status = obj.status
    }

    static readFile(cb) {
        fs.readFile('./employee.json', (err, data) => {
            err ? cb({msg: 'err readFile', err: err}): cb(null, data)
        })
    }
    
    static save(data, cb) {
        fs.writeFile('./employee.json', JSON.stringify(data, null, 2), function(err) {
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
                    return new Employee(obj)    
                });
                cb(null, result)
            }
        })
    }

    static findOne(find, input, cb) {
        this.findAll((err, data) => {
            if (err) {
                cb({msg: 'err', err: err})
            } else {
                let index = data.findIndex(obj => obj[find] === input)
                cb(null, data[index])
            }
        })
    }

    static create(newObj, cb) {
        this.findAll((err, data) => {
            if (err) {
                cb({msg: 'err findAll', err: err})
            } else {
                this.findOne('username', newObj.username, (err, obj) => {
                    if (err) {
                        cb({msg: 'err findOne', err: err})
                    } else {
                        if (obj) {
                            cb({msg: 'username sudah terpakai'})
                        } else {
                            // newObj.id = data.length+1
                            // newObj.status = 0
                            // data.push(new Employee(newObj))
                            // this.save(data, (err) => {
                            //     if (err) {
                            //         cb({msg: 'err saveData', err: err})
                            //     } else {
                            //         cb(null, newObj, data.length)
                            //     }
                            // })

                            // use bcryptjs
                            bcrypt.genSalt(10, (err, salt) => {
                                if (err) {
                                    cb({msg: 'err genSalt', err: err})
                                } else {
                                    bcrypt.hash(newObj.password, salt, (err, hash) => {
                                        if (err) {
                                            cb({msg: 'err hash', err: err})
                                        } else {
                                            newObj.id = data.length+1
                                            newObj.status = 0
                                            newObj.password = hash
                                            data.push(new Employee(newObj))
                                            this.save(data, (err) => {
                                                if (err) {
                                                    cb({msg: 'err saveData', err: err})
                                                } else {
                                                    cb(null, newObj, data.length)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }

    static update(newObj, input, cb) {
        this.findAll((err, data) => {
            if (err) {
                cb({msg: 'err findAll', err: err})
            } else {
                if (input === 'login') {
                    let checkLogin = data.findIndex(obj => obj.status === 1)
                    if (checkLogin !== -1) {
                        cb({msg: 'cannot login'})
                    }
                }
                let index = data.findIndex(obj => obj.username === newObj.username)
                if (index === -1) {
                    cb({msg: 'worng username'})
                // } else if (data[index].password !== newObj.password) {
                //     cb({msg: 'wrong password'})
                } else {
                    bcrypt.compare(newObj.password, data[index].password, (err, res) => {
                        if (err) {
                            cb({msg: 'err compare'})
                        } else {
                            if (!res) {
                                cb({msg: 'wrong password'})
                            } else {
                                input === 'login' ? data[index].status = 1: data[index].status = 0
                                this.save(data, (err) => {
                                    if (err) {
                                        cb({msg: 'err saveData', err: err})
                                    } else {
                                        cb(null, data[index].username)
                                    }
                                })
                            }
                        }
                    })
                }
                
            }
        })
    }


}

module.exports = Employee
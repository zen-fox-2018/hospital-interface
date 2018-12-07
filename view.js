const Controller = require('./controller.js')


class View{
    static Error(){
        console.log('process error')
    }

    static Display(data){
        console.log(data)
    }

    static registrationSuccess(data){
        console.log(`save data succes ${data[data.length-1]}. Total Employee: ${data.length}`)
    }

    static loginSuccess(data){
        console.log(`user ${data} login succesfully`);
    }

    static addPatientSuccess(data){
        console.log(`data pasien berhasil ditambahkan. Total data pasien ${data.length}`)
    }
}

module.exports = View
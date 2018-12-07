class View {
    static showAllTheEmployee(processedData){
        console.log(`List pegawai di RS Hacktiv8 :`)
        for (let i = 0; i < processedData.length; i++){
            console.log(`${i+1}. ${processedData[i].name} jabatan ${processedData[i].role} status login ${processedData[i].isLogin}`)
        }        
    }

    static showErrorRegisterMessage(msg){
        console.log(`terjadi error saat register berlangsung`)
        console.log(msg)
    }

    static showErrorMessage(msg){
        console.log(msg)
    }

    static showSuccessRegisterMessage(obj){
        let newIndex = obj.length - 1
        let newData = JSON.stringify(obj[newIndex])
        console.log(`save data success ${newData}.`)
        console.log(`Total Employee : ${obj.length} `)
    }

    static showLoginMessage(msg, username){
        if(msg === true){
            console.log(`user ${username} logged in successfully`)
        }
        else if(msg === false) {
            console.log(`username / password wrong`)
        }
    }
}

module.exports = View
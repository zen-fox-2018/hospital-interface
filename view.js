

class View {
    static viewData(input) {
        console.log(input)
    }
    static viewLogin(input) {
        if(input.length > 0) {
            console.log(`user ${input}, logged in succesfully`)
        }else {
            console.log('login tidak berhasil')
        }
    }
}

module.exports =  View
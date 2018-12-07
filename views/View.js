class View{
    static displaySuccess(msg) {
        console.log(msg)
    }

    static displaySuccessRegister(msg, input, length) {
        console.log(msg, input)
        console.log('Total Employee: ', length)
    }

    static displaySuccessPatient(msg, length){
        console.log(msg, length)
    }
    static displayError(msg) {
        console.log(msg)
    }    
}

module.exports = View
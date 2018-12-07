class View {
    static showData(data) {
        console.log(data);

    }

    static showError(err) {
        console.log(err);

    }

    static successRegister(data) {
        console.log(data.msg);

    }

    static errorLogin(data) {
        console.log(data.msg);

    }

    static succesAddPatient(data) {
        console.log(data.msg);

    }

    static errorLogout(data) {
        console.log(data.msg);

    }

    static successLogout(data) {
        console.log(data.msg);
        
    }
}

module.exports = View
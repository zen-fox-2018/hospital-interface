class View {

    static register(data, length) {
        console.log(`save data success ${JSON.stringify(data)}. Total employee: ${length}`);
    }

    static login(username) {
        console.log(`user ${username} logged in successfully`);
    }

    static logout(username) {
        console.log(`user ${username} logged out successfully`);
    }

    static displayError(err) {
        console.log(err);
    }

    static displayPatient(data) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien: ${data}`);
    }

}

module.exports = View
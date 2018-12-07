class View {
    static displayErr(err) {
        console.log(err)
    }

    static successSave(object, length) {
        console.log(`success save data ${JSON.stringify(object)}`)
        console.log(`Total employee: ${length}`)
    }

    static successLogin(username) {
        console.log(`user ${username} is logged in successfully`)
    }

    static successAddPatient(data) {
        console.log(`data pasien berhasil di tambahkan. total data pasient: ${data}`)
    }
}

module.exports = View
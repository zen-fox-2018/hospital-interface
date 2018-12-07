
class View {

    static showRegistered(data) {
        console.log(`save data a success! Total employee: ${data.length}`)
    }

    static showFindAll(data) {
        console.log(data)
    }

    static showLogin(input) {
        console.log(`User ${input} have successfully logged in`)
    }

    static showPatients(data) {
        console.log(data)
    }

    static showDeleted(data) {
        console.log(data)
    }
}

module.exports = View
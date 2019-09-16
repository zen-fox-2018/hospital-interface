
class View {

    static showRegistered(data) {
        console.log(`save data a success! Total employee: ${data.length}`)
    }

    static showFindAll(data) {
        console.log(data)
    }

    static failedLogin(err) {
        console.log(err)
    }

    static showLogin(input) {
        console.log(`User ${input} have successfully logged in`)
    }

    static showPatients(data) {
        console.log(data)
    }

    static showLoggedOut(data) {
        console.log("You have successfully logged out!")
    }
}

module.exports = View
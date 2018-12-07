class ViewEmployees {
    static registerSucceed(objPerson) {
        console.log(`Save data success ${JSON.stringify(objPerson[objPerson.length - 1])}. Total employee: ${objPerson.length}`)
    }

    static showError(errorMsg) {
        console.log(`ERROR!`)
        console.log(errorMsg)
    }

    static loginSucceed(username) {
        console.log(`User ${username} logged in successfully.`)
    }

    static loginFailed() {
        console.log(`Username / password wrong`)
    }
}

module.exports = ViewEmployees
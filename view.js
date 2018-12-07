class View {
    static registrationSuccess(employeesData) {
        let newEmployee = employeesData[employeesData.length-1]
        console.log(`save data success ${JSON.stringify(newEmployee)}. Total employee: ${employeesData.length}`)
    }
    static resgistrationFailed(err) {
        console.log(err)
    }
    static loginSucceed(name) {
        console.log(`${name} logged in successfully`)
    }
    static loginFailed() {
        console.log("username / password wrong")
    }
    static cantLogin() {
        console.log("max login reached")
    }
}
module.exports = View
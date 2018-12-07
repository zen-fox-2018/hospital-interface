class View {
    static registerSucceed(data) {
        let displayData = data[data.length-1]
        console.log(`save data success ${JSON.stringify(displayData)}. Total employee: ${data.length}`)
    }

    static registerFailed(err){
        console.log(err)
    }

    static loginSucceed(name) {
        console.log(`${name} logged in successfully`)
    }
    static loginFailed() {
        console.log("username / password wrong")
    }
}

module.exports = View

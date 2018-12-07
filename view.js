class View {

    static logError(err) {
        console.log('ERROR\n', err);
    }

    static registrationComplete(data) {
        console.log(`save data succes`)
    }
}

module.exports = View;
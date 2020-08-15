const Controller = require('./controllers/Controller')

const argv = process.argv.slice(2)

Controller.execute(argv)
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()
const PORT = config.get('port') ?? 8080

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api', routes)

// if (process.env.NODE_ENV === 'production') {
//   console.log('production')
// } else {
//   console.log('development')
// }

async function start() {

  try {
    // событие выполняется один раз при открытии сервера
    mongoose.connection.once('open', () => {
      // проверка данных в базе
      initDatabase()
    })
    await mongoose.connect(config.get('mongoUri'))
    console.log(chalk.green('MongoDB connected.'))
    app.listen(PORT, () => {
      console.log(chalk.blue(`Server has been started on port ${PORT}...`))
    })
  } catch (error) {
    console.log(chalk.red(error.message))
    // при ошибке выйти из программы
    process.exit(1)
  }
}

start()

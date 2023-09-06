const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')

const app = express()
const PORT = 8080

app.listen(8080, () => {
  console.log(chalk.blue('Server has been started on port '))
})

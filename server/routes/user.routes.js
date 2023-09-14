const express = require('express')
const chalk = require('chalk')
const router = express.Router({mergeParams: true})
const User = require('../models/User')

router.patch('/:userId', async (req, res) => {
  try {
    const { userId } = req.params    

    //todo if userId === current user id
    if (userId) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
      res.send(updatedUser)
    } else {
      res.status(401).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.',
        errors: errors.array()
      })
    }

  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(401).json({message: 'Не авторизован'})
  }
})

router.get('/', async (req, res) => {
  try {
    const list = await User.find() 
    res.send(list)
  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.',
      errors: errors.array()
    })
  }
})

module.exports = router

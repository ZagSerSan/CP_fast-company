const express = require('express')
const router = express.Router({mergeParams: true})
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const { check, validationResult } = require('express-validator')
const { generateUserData } = require('../utils/helpers')
const TokenService = require('../services/token.service')

//todo что нужно сделать в signUp
// 1. получить data из запроза, req: (email, password, ...)
// 2. проверить, существует ли такой пользователь, чтобы не создать два одинаковых
// 3. создать захешированный пароль, чтобы не хранить прямой пароль
// 4. создать пользователя
// 5. создать токены в локал стор для авторизации
router.post('/signUp', [
  // правила валидации
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 8 символов').isLength(8),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array()
          }
        })
      }

      const { email, password } = req.body // 1
      const existUser = await User.findOne({ email }) // 2

      if (existUser) {
        // если пользователь найден, то отвечаем обратно клиенту и меняем статус на ошибку
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400
          }
        })
      }

      // если предыдущий if не выполнился, знач всё нормально и продолжаем процесс регистрации
      // 3. шифровка пароля (пароль, число-сложность шифрования)
      const hashedPassword = await bcrypt.hash(password, 12)
      // 4
      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword
      })
      // 5
      const tokens = TokenService.generate({ _id: newUser._id })
      // подождать пока сохраним токен для пользователя
      await TokenService.save(newUser._id, tokens.refreshToken)
      res.status(201).send({...tokens, userId: newUser._id})

    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.',
        errors: errors.array()
      })
    }
  }
])

//todo что нужно сделать в signInWithPassword
// 1. validate
// 2. найти пользователя
// 3. сравнить шифрованный парол
// 4. сделать токены
// 5. return data
router.post('/signInWithPassword', [
  check('email', 'Email некорректный').normalizeEmail().isEmail(),
  check('password', 'Пароль отсутствует').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req) // 1
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array()
          }
        })
      }
      const { email, password } = req.body 
      const existUser = await User.findOne({ email }) // 2

      if (!existUser) {
        // если пользователь найден, то отвечаем обратно клиенту и меняем статус на ошибку
        return res.status(400).send({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400
          }
        })
      }

      // 3
      const isPasswordEqual = await bcrypt.compare(password, existUser.password)
      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400
          }
        })
      }

      // 4
      const tokens = TokenService.generate({ _id: existUser._id })
      await TokenService.save(existUser._id, tokens.refreshToken)

      res.status(200).send({ ...tokens, userId: existUser._id })

    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.',
        errors: errors.array()
      })
    }
  }
])

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

// refresh tokens
router.post('/token', async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body
    const data = TokenService.validateRefresh(refreshToken)
    // получаем токен из базы
    const dbToken = await TokenService.findToken(refreshToken)

    if (isTokenInvalid(data, dbToken)) {
      res.status(401).json({message: 'Unauthorized'})
    }

    const tokens = TokenService.generate({ _id: data._id })
    await TokenService.save(data._id, tokens.refreshToken)

    res.status(200).send({ ...tokens, userId: data._id })
  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.',
      // errors: errors.array()
    })
  }
})

module.exports = router

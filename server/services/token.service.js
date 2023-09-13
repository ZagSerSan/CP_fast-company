const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
  // return: accessToken, refreshToken, expiresIn
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecretKey'), {
      expiresIn: '1h'
    })
    const refreshToken = jwt.sign(payload, config.get('refreshSecretKey'))
    return {
      accessToken, refreshToken, expiresIn: 3600
    }
  }

  // будет сохранять refreshToken для определённого пользователя
  async save(user, refreshToken) {
    const data = await Token.findOne({ user })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }
    // если этот if не выполнился, то создаём запись
    const token = await Token.create({ user, refreshToken })
    return token
  }
}

module.exports = new TokenService()

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

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshSecretKey'))
    } catch (e) {
      return null
    }
  }
  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessSecretKey'))
    } catch (e) {
      return null
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken })
    } catch (error) {
      console.log('error::', error)
      return null
    }
  }
}

module.exports = new TokenService()

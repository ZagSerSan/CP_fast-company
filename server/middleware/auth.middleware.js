const TokenSevise = require('../services/token.service')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // Bearer token-key-fsdfsdf3f23f-3f2f3f...
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(401).json({message: 'Unauthorized'})
    }

    const data = TokenSevise.validateAccess(token)
    if (!data) {
      return res.status(401).json({message: 'Unauthorized'})
    }

    req.user = data
    next()
  } catch (e) {
    res.status(401).json({message: 'Unauthorized'})
  }
}

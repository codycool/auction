const jwt = require('jsonwebtoken');
const Config = require('../config');
const Boom = require('boom');

const getToken = {
  ['JWT'](userInfo) {
    return jwt.sign(userInfo, Config.jwt.jwtSecret, { algorithm: 'HS512', expiresIn: Config.jwt.jwtTokenExpiresIn })
  },
  ['EMAIL'](email) {
    return jwt.sign({ email }, Config.jwt.jwtSecret, { algorithm: 'HS256', expiresIn: Config.jwt.emailTokenExpiresIn })
  }
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, Config.jwt.jwtSecret, (err, decoded) => {
      if (err) {
        const TokenError = Boom.unauthorized('Token is not valid or expired')
        return reject(TokenError)
      }
      resolve(decoded)
    })
  })
}

const bearerToToken = (authorization) => {
  const parts = authorization.split(' ');
  if(parts.length === 2){
      const [ schema, credential ] = parts;
      if (/^Bearer$/i.test(schema)) {
        return credential
    }
  }
}

module.exports = {
    getToken : getToken,
    verifyToken : verifyToken,
    bearerToToken : bearerToToken
}


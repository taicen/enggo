const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  const {headers: { authorization }} = req;

  if (req.method === 'OPTIONS') {
    return next()
  }

  if(authorization){
    const token = authorization.replace('Bearer ', '');

    if (!token) {
      return res.status(401).send({ message: 'Нет авторизации' })
    }
    
    try{
      
      const decoded = jwt.verify(token, config.get('jwtSecret'))

      if(decoded.type !== 'access'){
        return res.status(401).send({ message: 'Token invalid!' })
      }

      req.user = decoded
      return next()

    } catch(e) {
      if(e instanceof jwt.TokenExpiredError){
        return res.status(401).send({ message: 'Token expired!' })
      }
      if(e instanceof jwt.JsonWebTokenError){
        return res.status(401).send({ message: 'Нет авторизации' })
      }
    }
  }

  return res.status(403).send({
    message: 'Авторизуйтесь!'
  })
}
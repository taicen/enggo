const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const { User, Token } = require('../model')
const {validationResult} = require('express-validator')


module.exports = {
  async login(req, res) {
    try{
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }

      const {body: { email, password }} = req
      const user = await User.findOne({ email })

      if(!user){
        return res.status(400).json({
          status: 400,
          message: 'Извините, пользователь не найден',
          ...errors
        })
      }

      const isMatch = await bcrypt.compareSync(password, user.password)

      if(!isMatch){
        return res.status(400).json({
          status: 400,
          message: 'Извините, логин или пароль не верный',
          ...errors
        })
      }

      const accessToken = jwt.sign({
        userId: user._id,
        email: user.email,
        type: 'access'
      }, config.get('jwtSecret'), { expiresIn: '2m' })

      const payloadRefresh = {
        id: uuid.v4(),
        type: 'refresh' 
      }

      const refreshToken = jwt.sign({
        userId: user._id,
        email: user.email,
        ...payloadRefresh
      }, config.get('jwtSecretRefresh'), { expiresIn: '7h' })

      const foundToken = await Token.findOne({user: user._id})

      if(foundToken){
        await Token.findByIdAndUpdate(foundToken._id, { token: refreshToken })

        return res.send({ 
          accessToken,
          refreshToken,
          userId: user.id,
          id: payloadRefresh.id
        })
      }

      const token = new Token({token: refreshToken, user: user._id})
      await token.save()

      return res.send({ 
        accessToken,
        refreshToken,
        userId: user.id,
        id: payloadRefresh.id
      })

    } catch(errors) {
      return res.status(403).send({
        message: 'Вы не авторизованы'
      })
    }
  },
  // регистрация или создание пользователя
  async signUp(req, res){
    try{
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Некорректные данные при регистрации',
          ...errors
        })
      }

      const { body: {email, password} } = req
      const findUser = await User.findOne({ email })
      
      if(findUser){
        return res.status(403).send({ message: 'Данный емейл занят' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = new User({ email, password: hashedPassword })
      await newUser.save()

      return res.status(201).send({message: 'Пользователь создан'})
    }catch(errors){
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  },

  async refreshToken(req, res){
    const { body: {refreshToken} } = req;
    
    // проверяем в запросе на сервер
    if(!refreshToken){
      return res.status(401).json({message: 'Действие запрещено'})
    }

    // ищем токен в БД
    const current = await Token.find({token: refreshToken})

    if(!current){
      return res.status(401).json({message: 'Действие запрещено'})
    }

    jwt.verify(refreshToken, config.get('jwtSecretRefresh'), (err, user)=>{
      if(err){
        return res.status(401).json({message: 'Значение токена неверно'})
      }

      const accessToken = jwt.sign({
        userId: user._id,
        email: user.email,
        type: 'access'
      }, config.get('jwtSecret'), { expiresIn: '2m' })

      return res.status(200).send({
        accessToken,
        userId: user.userId
      })
    })
  },

  async logout(req, res){
    const { body: { refreshToken } } = req
    // const user = await jwt.decode(authorization, config.get('jwtSecret'))
    // находим токен по переданному в теле токену
    // TODO посмотреть в сторону передачи через заголовки, а не в теле
    const foundToken = await Token.findOne({token: refreshToken})
    // если такого нет, то ошибка
    if(!foundToken){
      return res.status(403).send({
        message: 'Пользователь не авторизован'
      })
    }
    // иначе удаляем из БД
    await Token.findByIdAndDelete(foundToken._id)

    return res.status(200).send({
      message: 'Разлогинен'
    })
  }
}
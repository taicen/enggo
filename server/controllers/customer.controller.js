const jwt = require('jsonwebtoken')
const config = require('config')
// const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const { Customer, Token } = require('../model')
// const {validationResult} = require('express-validator')


module.exports = {
  async generateRoom(req, res) {

    try {
      const { body: { phone } } = req
      const user = await Customer.findOne({ phone })
      const id_room = 'enggo' + phone.slice(-7)

      const payloadRefresh = uuid.v4()

      const accessToken = jwt.sign({
        link: payloadRefresh,
        room: id_room,
      }, config.get('jwtSecret'), { expiresIn: '2h' })

      // создать пользователя если нет
      if (!user) {
        const newUser = new Customer({ phone, room: id_room, link: payloadRefresh })
        await newUser.save()

        const token = new Token({ token: accessToken, link: payloadRefresh, user: newUser._id })
        await token.save()
        // return res.status(400).send({
        //   status: 400,
        //   message: 'Извините, пользователь не найден'
        // })
        return res.send({
          accessToken,
          userId: newUser._id,
          id: payloadRefresh
        })
      }

      // if( user.role === 'teacher'){

      if (!user.link) {
        // const payloadRefresh = uuid.v4()
        await Customer.findByIdAndUpdate(user._id, { link: payloadRefresh })

        // const accessToken = jwt.sign({
        //   link: payloadRefresh,
        // }, config.get('jwtSecret'), { expiresIn: '1m' })

        const token = new Token({ token: accessToken, link: payloadRefresh, user: user._id })
        await token.save()

        return res.send({
          accessToken,
          userId: user._id,
          id: payloadRefresh
        })
      }

      const foundToken = await Token.findOne({ user: user._id })

      return res.send({
        accessToken: foundToken.token,
        userId: user._id,
        id: user.link
      })
      // }

      // if( user.role === 'student' ){
      //   const teacher = await Customer.findOne({ _id: user.teacher })
      //   const foundToken = await Token.findOne({user: user.teacher})

      //   return res.send({
      //     accessToken: foundToken.token,
      //     userId: user._id,
      //     role: user.role,
      //     id: teacher.link
      //   })
      // }

    } catch (errors) {
      console.log("%c 🗝️: generateRoom -> errors ", "font-size:16px;background-color:#57b18d;color:white;", errors)
      return res.status(404).send({
        message: 'Что-то пошло не так!'
      })
    }
  },

  // async login(req, res) {
  //   try{
  //     const errors = validationResult(req)

  //     if (!errors.isEmpty()) {
  //       return res.status(400).json({
  //         status: 400,
  //         errors: errors.array(),
  //         message: 'Некорректные данные при входе в систему'
  //       })
  //     }

  //     const {body: { email, password }} = req
  //     const user = await User.findOne({ email })

  //     if(!user){
  //       return res.status(400).json({
  //         status: 400,
  //         message: 'Извините, пользователь не найден',
  //         ...errors
  //       })
  //     }

  //     const isMatch = await bcrypt.compareSync(password, user.password)

  //     if(!isMatch){
  //       return res.status(400).json({
  //         status: 400,
  //         message: 'Извините, логин или пароль не верный',
  //         ...errors
  //       })
  //     }

  //     const accessToken = jwt.sign({
  //       userId: user._id,
  //       email: user.email,
  //       type: 'access'
  //     }, config.get('jwtSecret'), { expiresIn: '2m' })

  //     const payloadRefresh = {
  //       id: uuid.v4(),
  //       type: 'refresh'
  //     }

  //     const refreshToken = jwt.sign({
  //       userId: user._id,
  //       email: user.email,
  //       ...payloadRefresh
  //     }, config.get('jwtSecretRefresh'), { expiresIn: '7h' })

  //     const foundToken = await Token.findOne({user: user._id})

  //     if(foundToken){
  //       await Token.findByIdAndUpdate(foundToken._id, { token: refreshToken })

  //       return res.send({
  //         accessToken,
  //         refreshToken,
  //         userId: user.id,
  //         id: payloadRefresh.id
  //       })
  //     }

  //     const token = new Token({token: refreshToken, user: user._id})
  //     await token.save()

  //     return res.send({
  //       accessToken,
  //       refreshToken,
  //       userId: user.id,
  //       id: payloadRefresh.id
  //     })

  //   } catch(errors) {
  //     return res.status(403).send({
  //       message: 'Вы не авторизованы'
  //     })
  //   }
  // },

  // регистрация или создание пользователя
  // async addStudent(req, res){
  //   try {

  //     const { body: {email, phone, username } } = req
  //     const findUser = await Customer.findOne({ phone })

  //     if(findUser){
  //       return res.status(403).send({ message: 'Пользователь существует' })
  //     }

  //     const findTeacher = await Customer.findOne({ phone: '+77783695862' })

  //     const newUser = new Customer({ email, phone, username, teacher: findTeacher._id})
  //     await newUser.save()

  //     return res.status(201).send({message: 'Пользователь создан'})
  //   } catch (errors) {
  //     res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  //   }
  // },

  async clearRoom(req, res) {
    try {

      const { body: { link } } = req
      // const findUser = await Customer.findOne({ link })
      // console.log("%c 😸: clearRoom -> findUser ", "font-size:16px;background-color:#38f089;color:black;", findUser)
      const foundToken = await Token.findOne({ link })

      if (foundToken) {
        await Customer.findByIdAndUpdate(foundToken.user, { link: '' })
        await Token.findByIdAndDelete(foundToken._id)
      }

      // if(!findUser){
      //   return res.status(403).send({ status: 403, message: 'Комната не существует' })
      // }

      // const findTeacher = await Customer.findOne({ phone: '+77783695862' })

      // const newUser = new Customer({ email, phone, username, teacher: findTeacher._id})
      // await newUser.save()

      return res.status(201).send({
        status: 200,
        message: 'Комната удалена'
      })
    } catch (errors) {
      console.log("👨‍👩‍👧‍👦: ", errors)
      res.status(404).send({ message: 'Комната не существует' })
    }
  },

}

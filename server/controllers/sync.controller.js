const request = require("request");
const config = require('config')
// const _ = require('lodash');
// const { Product, Category } = require('../model');

const API_KEY = config.get('apiKey');
const API_URL = config.get('apiUrl');
// const PROXY_URL = config.get('proxyUrl');
const API_EMAIL = 'alexandrdoktorov@gmail.com';

module.exports = {
  async auth(req, res) {
    // const { body: { refreshToken } } = req
    // const user = await jwt.decode(authorization, config.get('jwtSecret'))

    // находим токен по переданному в теле токену
    // TODO посмотреть в сторону передачи через заголовки, а не в теле
    // const foundToken = await Token.findOne({token: refreshToken})
    // если такого нет, то ошибка
    // if(!foundToken){
    //   return res.status(403).send({
    //     message: 'Пользователь не авторизован'
    //   })
    // }
    // иначе удаляем из БД
    // await Token.findByIdAndDelete(foundToken._id)

    const url = `${API_URL}/auth/login`;

    request({
      method: "POST",
      url,
      headers: { 'Content-Type': 'application/json' },
      form: JSON.stringify({
        api_key: API_KEY,
        email: API_EMAIL
      })
    },
      function (error, response) {
        return res.status(200).send(JSON.parse(response.body))
      }
    );
  },

  async teacher(req, res) {
    const { body: { phone, token } } = req;

    const url = `${API_URL}/teacher/index`;

    request({
      method: "POST",
      url,
      headers: {
        'X-ALFACRM-TOKEN': token,
        'Content-Type': 'application/json'
      },
      form: JSON.stringify({
        phone: phone,
      })
    },
      function (error, response) {
        return res.status(200).send(JSON.parse(response.body))
      }
    );
  }
}

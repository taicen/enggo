const request = require("request");
const config = require('config')
const _ = require('lodash');
const { Product, Category } = require('../model');

const API_KEY = config.get('apiKey');
const API_URL = config.get('apiUrl');
const PROXY_URL = config.get('proxyUrl');

module.exports = {
  async fetchProduct(req, res){
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

    const url = `${API_URL}get_products`;

    request({ 
        method: "POST",
        url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        form: {
          secret: API_KEY
        }
      },
      function (error, response) {
        if (error) throw new Error(error);
        const {name, product_id, price} = JSON.parse(response.body);
        // нужны отдельно категории и продукты
        let categories = [];
        let products = [];
        const len = product_id.length;

        categories = name.map((item) => {
          const cat_name = item.split(' ')[0] === 'Вафельный' ? 'Wafi' : item.split(' ')[0]; 
          return {title: cat_name}
        })
  
        categories = _.filter(_.map(
            _.uniqBy(categories, 'title'), (item, i) => { 
            const id = i-1;
            return {
              title: item.title,
              id
            } 
          }),
          // filter
          (item) => { 
            return (item.title === 'Maxi' || item.title === 'Mini' || item.title === 'Sity' || item.title === 'Wafi')
          });
  
        for(let i = 0; i < len; i++ ){
          const cat_name = name[i].split(' ')[0] === 'Вафельный' ? 'Wafi' : name[i].split(' ')[0];
          const category = _.find(categories, ['title', cat_name]);
         
          if(category)
            products.push({
              product_id: product_id[i],
              title: name[i],
              price: +price[i],
              category_id: category.id
            })
        }

        _.forEach(categories, function(category){
          
          Category.findOneAndUpdate(
            {title: category.title},
            category,
            { 
              new: true,
              upsert: true
            },
            (err, res)=>{
              if (err) throw err;
              
              const items = _.filter(products, (item)=>{
                return item.category_id === category.id
              })
  
              _.forEach(items, (product)=>{
                Product.findOneAndUpdate(
                  {product_id: product.product_id},
                  {...product, category: res._id},
                  { 
                    new: true,
                    upsert: true
                  },
                  (err) => {
                    if (err) throw err;
                  }
                )
              })
            }
          )
        })
      
        return res.status(200).send(JSON.parse(response.body))
      }
    );

    
  }
}
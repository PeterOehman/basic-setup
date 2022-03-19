const db = require('./database')
const User = require('./users')
const Product = require('./products')

//Associations
User.belongsToMany(Product, { through: 'User_Product' })
Product.belongsToMany(User, { through: 'User_Product' })

module.exports = {
  db,
  User,
  Product
}

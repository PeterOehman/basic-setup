const Sequelize = require('sequelize')
//creates our connection to our database
//if using heroku, it has its own database, which will add its url under DATABASE_URL in your environment variables
const db = new Sequelize(process.env.DATABASE_URL || 'postgress://localhost:5432/boilerplate', {
  //to stop the default logging sequelize does
  logging: false
})

module.exports = db

const { Sequelize } = require('sequelize')
const {db} = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = db.define('user', {
  unsername: {
    type: Sequelize.STRING,
    allowNull: false,
    //for now the username will be unique, enventually this should be changed to a unique email, and then the user uses the email to log in
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isPassword: true
    }
  }
})

//INSTANCE METHODS

//this will check the password a user inputs while logging in with the actual password in the database
User.prototype.checkPassword = (userInputPassword) => {
  //the context of 'this' is going to be a specific user, check User.authenticate to see where this is called
  return bcrypt.compare(userInputPassword, this.password)
}

//this will encrypt the users id with the jwt environment variable
User.prototype.generateToken = () => {
  //look in package json at the start server script, it creates an environment variable for jwt
  return jwt.sign({ id: this.id }, process.env.JWT)
}

//CLASS METHODS

//will check if the username and password are correct, if they are it will start a user session
User.authenticate = async ({ username, password }) => {
  try {
    const user = await this.findOne({ where: { username }})
    //if the username doesn't exist in the database, or if the password is incorrect for the username, throw an error
    if (!user || !(await user.checkPassword(password))) {
      const error = Error('Incorrect username or password')
      error.status = 401
      throw error
    }
    //if the username exists and the password is correct, start a session for that user
    return user.generateToken()
  } catch (error) {
    console.error(error)
  }
}

//this receives a token, checks that its correct and returns the user that token belongs to
User.findByToken = async (token) => {
  try {
    //this unencrypts the token to get its original data, remember we set this token with the users id so thats what we'll get back
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = await User.findByPk(id)
    //this if statement passes if jwt.verify works but doesn't return a users id
    if (!user) {
      throw 'nope'
    }
    return user
  } catch (err) {
    //we don't just want to log the error, we want to tell the user the token isn't good
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

//before a user is put in the database, hash the password
User.beforeCreate = async (user) => {
  try {
    //????
    db.sync()
    user.password = await bcrypt.hash(user.password, 5)
  } catch (error) {
    console.error(error)
  }
}

module.exports = User

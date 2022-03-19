const app = require('./server')
const {db} = require('./server/db')
//not yet sure why this is needed
const port = process.env.PORT || 1337

const init = async () => {
  try {
    //if we run the script 'npm start-dev-seed' it will set seed to 'true' as an environment variable
    if (process.env.SEED === 'true') {
      // await seed()
    } else {
      await db.sync()
    }
    //start the server
    app.listen(port, () => {
      console.log('Speedily serving silly sounds on port 1337')
    })
  } catch (error) {
    console.error(error)
  }
}

init()

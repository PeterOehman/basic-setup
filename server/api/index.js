const router = require('express').Router()

//if we get this far our route is not found
router.use((req, res, next) => {
  const err = new Error('API Route Not Found')
  err.status = 404
  next(err)
})

module.exports = router

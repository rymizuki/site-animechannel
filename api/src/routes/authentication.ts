import express from 'express'
const router = express.Router()

router.get('/', function (req, res, next) {
  return res.json(req.user ? req.user.authentication : {})
})

export default router

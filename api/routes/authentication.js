const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  return res.json(req.user ? req.user.authentication : {})
})

module.exports = router

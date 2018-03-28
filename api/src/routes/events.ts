import express from 'express';
const router = express.Router();

import moment from 'moment'

import { get, find, chain } from 'lodash'

import Events from '../services/events'

// authorize
function authorize (req, res, next) {
  const auth = get(req, 'user.authentication')
  if (auth == null) return res.status(401).end()
  if (find(auth.permissions, { name: 'event_management'} == null)) return res.status(401).end()
  return next()
}

router.get('/', function (req, res, next) {
  Events.list()
    .then((events) => {
      return res.json(events)
    })
})

router.get('/:id', function (req, res, next) {
  Events.find(req.params.id)
    .then((event) => {
      return res.json(event)
    })
})

router.post('/', authorize, function (req, res, next) {
  const data = req.body

  Events.add(data)
    .then((event) => {
      return res.json({ id: event.id })
    })
})

export default router

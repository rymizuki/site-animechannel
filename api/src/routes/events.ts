import express from 'express';
const router = express.Router();

import moment from 'moment'

import { get, find, chain } from 'lodash'

import Events from '../services/events'
import EventParticipation from '../services/event-participation'

import * as UserRepository  from '../repositories/user'
import * as EventRepository from '../repositories/event'

import EventEntity from '../entities/event'

// authorize
function authorizeManager (req, res, next) {
  const auth = get(req, 'user.authentication')
  if (auth == null) return res.status(401).end()
  if (find(auth.permissions, { name: 'event_management'} == null)) return res.status(401).end()
  return next()
}
function authorizeParticipant (req, res, next) {
  const auth = get(req, 'user.authentication')
  if (auth == null) return res.status(401).end()
  if (find(auth.permissions, { name: 'event_joinning'} == null)) return res.status(401).end()
  return next()
}

router.get('/', authorizeParticipant, function (req, res, next) {
  Events.list()
    .then((events) => {
      return res.json(events)
    })
})

router.get('/:id', authorizeParticipant, function (req, res, next) {
  Events.find(req.params.id)
    .then((event) => {
      return res.json(event)
    })
})

router.post('/:id/participants', authorizeParticipant, async function (req, res, next) {
  const { name, accept_dates } = req.body
  const user  = await UserRepository.fetch(get(req, 'user.authentication.user.id'))
  const event = await EventRepository.fetch(req.params.id)

  new EventParticipation(user, event)
    .exec(name, accept_dates)
    .then((event) => {
      return res.json(event)
    })
})

router.put('/:id/participants/:user_id', function (req, res, next) {
  res.status(404).end()
})

router.post('/', authorizeManager, function (req, res, next) {
  const data = req.body

  Events.add(data)
    .then((event) => {
      return res.json({ id: event.id })
    })
})

export default router

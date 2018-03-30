import express from 'express';
const router = express.Router();

import moment from 'moment'

import { get, find, chain } from 'lodash'

import EventParticipation from '../services/event-participation'

import * as UserRepository    from '../repositories/user'
import * as EventsRepository  from '../repositories/events'
import * as EventRepository   from '../repositories/event'

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

router.get('/', authorizeParticipant, async function (req, res, next) {
  const events = await EventsRepository.fetchRecently()

  return res.json(events)
})

router.get('/:id', authorizeParticipant, async function (req, res, next) {
  const event = await EventRepository.fetch(req.params.id)
  console.log('event', event)

  return res.json(event)
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

router.post('/', authorizeManager, async function (req, res, next) {
  const data = req.body
  const event = await EventsRepository.add(data)

  return res.json({ id: event.id })
})

export default router

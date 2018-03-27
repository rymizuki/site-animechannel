const express = require('express');
const router = express.Router();

const moment = require('moment')

const { get, find, chain } = require('lodash')

const Event = require('../schema/event')
const EventCondition = require('../schema/event-condition')

// authorize
function authorize (req, res, next) {
  const auth = get(req, 'user.authentication')
  if (auth == null) return res.status(401).end()
  if (find(auth.permissions, { name: 'event_management'} == null)) return res.status(401).end()
  return next()
}

function candidateDates (condition) {
  const from = moment(condition.from)
  const to   = moment(condition.to)
  const diff = Math.ceil(to.diff(from, 'day', true))
  return chain(diff)
    .times()
    .map((index) => from.clone().add(index, 'days'))
    .filter((date) => {
      if (condition.holiday) return true // 休日を含むなら常にtrue
      if (date.isoWeekday() == 6) return false // 土曜日はfalse
      if (date.isoWeekday() == 7) return false // 日曜日はfalse
      return true // FIXME: 祝日
    })
    .map((date) => date.format('YYYY-MM-DD'))
    .value()
}

const label = {
  accepting: '受付中',
  hold: '開催待ち',
  fnished: '終了',
}

function buildEntity (event) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    state: {
      type: event.status,
      name: label[event.status],
    },
    candidate_dates: candidateDates(event.event_condition),
    participants: [] // TODO,
  }
}

router.get('/', function (req, res, next) {
  Event.findAll({
    order: [
      ['id', 'DESC'],
    ],
    include: [
      EventCondition,
    ],
  })
    .then((events) => {
      return events.map((event) => buildEntity(event))
    })
    .then((events) => {
      return res.json(events)
    })
})

router.get('/:id', function (req, res, next) {
  Event.findOne({
    where: { id: req.params.id },
    include: [
      EventCondition,
    ]
  })
    .then((event) => buildEntity(event))
    .then((event) => {
      return res.json(event)
    })
})

router.post('/', authorize, function (req, res, next) {
  const data = req.body

  // TODO: transaction
  const event = Event.build()
  event.title       = data.title
  event.description = data.description
  event.place       = data.place
  event.status      = 'accepting'
  event.save()
    .then((event) => {
      const condition = EventCondition.build()
      condition.eventId = event.id
      condition.from    = moment(data.candidate.from).format('YYYY-MM-DD')
      condition.to      = moment(data.candidate.to).add(1, 'days').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss')
      condition.holiday = data.holiday
      return condition.save()
        .then(() => event)
    })
    .then((event) => {
      res.json({ id: event.id })
    })
})

module.exports = router

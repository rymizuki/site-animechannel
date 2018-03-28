const indexRouter = require('./routes/index');
const authRouter  = require('./routes/auth')
const authenticationRouter = require('./routes/authentication')
const permissionsRouter = require('./routes/permissions')
const usersRouter = require('./routes/users')
const eventsRouter = require('./routes/events')

module.exports = function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/api/authentication', authenticationRouter)
  app.use('/api/permissions', permissionsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/events', eventsRouter)
}

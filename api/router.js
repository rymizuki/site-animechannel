const indexRouter = require('./routes/index');
const authRouter  = require('./routes/auth')
const authenticationRouter = require('./routes/authentication')

module.exports = function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/api/authentication', authenticationRouter)
}

var indexRouter = require('./routes/index');
var authRouter  = require('./routes/auth')

module.exports = function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
}
